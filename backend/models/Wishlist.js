const db = require('../config/database');

class Wishlist {
  static async getWishlistItems(userId = 1) {
    try {
      const [rows] = await db.execute(
        `SELECT w.*, p.name, p.price, p.image_url, p.discount_percentage, p.original_price, p.rating, p.reviews_count
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async addToWishlist(userId = 1, productId) {
    try {
      // Check if item already exists in wishlist
      const [existing] = await db.execute(
        'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      
      if (existing.length > 0) {
        return { message: 'Item already in wishlist' };
      }

      const [result] = await db.run(
        'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async removeFromWishlist(wishlistId) {
    try {
      const [result] = await db.run('DELETE FROM wishlist WHERE id = ?', [wishlistId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async removeByProductId(userId = 1, productId) {
    try {
      const [result] = await db.run(
        'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async isInWishlist(userId = 1, productId) {
    try {
      const [rows] = await db.execute(
        'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Wishlist;