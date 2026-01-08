const db = require('../config/database');

class Product {
  static async getAll(filters = {}) {
    try {
      let query = `
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE 1=1
      `;
      const params = [];

      // Search filter
      if (filters.search) {
        query += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)`;
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      // Category filter
      if (filters.category) {
        query += ` AND p.category_id = ?`;
        params.push(filters.category);
      }

      query += ` ORDER BY p.created_at DESC`;

      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.execute(
        `SELECT p.*, c.name as category_name 
         FROM products p 
         LEFT JOIN categories c ON p.category_id = c.id 
         WHERE p.id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(productData) {
    try {
      const [result] = await db.run(
        `INSERT INTO products (name, description, price, original_price, discount_percentage, 
         category_id, brand, stock, rating, reviews_count, image_url, images, specifications) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productData.name,
          productData.description,
          productData.price,
          productData.original_price,
          productData.discount_percentage,
          productData.category_id,
          productData.brand,
          productData.stock,
          productData.rating || 0,
          productData.reviews_count || 0,
          productData.image_url,
          JSON.stringify(productData.images || []),
          JSON.stringify(productData.specifications || {})
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const [result] = await db.run(
        `UPDATE products SET 
         name = ?, description = ?, price = ?, stock = ? 
         WHERE id = ?`,
        [productData.name, productData.description, productData.price, productData.stock, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.run('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
