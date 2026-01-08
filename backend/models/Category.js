const db = require('../config/database');

class Category {
  static async getAll() {
    try {
      const [rows] = await db.execute('SELECT * FROM categories ORDER BY name');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(name, description) {
    try {
      const [result] = await db.run(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
