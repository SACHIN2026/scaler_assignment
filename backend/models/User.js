const db = require('../config/database');
const crypto = require('crypto');

class User {
  static async create(userData) {
    try {
      // Hash password (simple hash for demo - use bcrypt in production)
      const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
      
      const [result] = await db.run(
        `INSERT INTO users (name, email, phone, password, created_at) 
         VALUES (?, ?, ?, ?, datetime('now'))`,
        [userData.name, userData.email, userData.phone, hashedPassword]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(email, password) {
    try {
      const user = await this.findByEmail(email);
      if (!user) return null;

      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (user.password === hashedPassword) {
        return { id: user.id, name: user.name, email: user.email };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;