const db = require('../config/database');

class Cart {
  static async getCartItems(userId = 1) {
    try {
      const [rows] = await db.execute(
        `SELECT c.*, p.name, p.price, p.image_url, p.stock, p.discount_percentage, p.original_price
         FROM cart c
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async addToCart(userId = 1, productId, quantity = 1) {
    try {
      // Check if item already exists in cart
      const [existing] = await db.execute(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      if (existing.length > 0) {
        // Update quantity
        const [result] = await db.run(
          'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
          [quantity, userId, productId]
        );
        return result;
      } else {
        // Insert new item
        const [result] = await db.run(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, productId, quantity]
        );
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateQuantity(cartId, quantity) {
    try {
      const [result] = await db.run(
        'UPDATE cart SET quantity = ? WHERE id = ?',
        [quantity, cartId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async removeFromCart(cartId) {
    try {
      const [result] = await db.run('DELETE FROM cart WHERE id = ?', [cartId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async clearCart(userId = 1) {
    try {
      const [result] = await db.run('DELETE FROM cart WHERE user_id = ?', [userId]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;
