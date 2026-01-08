const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: '9aac0z.h.filess.io',
  port: 3307,
  user: 'scalar_mealloudin',
  password: 'f631f797b70b963a73d286818dbee52f8394f909',
  database: 'scalar_mealloudin',
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
});

console.log('Connected to MySQL database');

// Initialize database tables synchronously
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const queries = [
      // Categories Table
      `CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Products Table
      `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        discount_percentage INT,
        category_id INT,
        brand VARCHAR(100),
        stock INT DEFAULT 0,
        rating DECIMAL(2,1) DEFAULT 0,
        reviews_count INT DEFAULT 0,
        image_url TEXT,
        images TEXT,
        specifications TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category_id)
      )`,
      
      // Cart Table
      `CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT 1,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_product (user_id, product_id)
      )`,
      
      // Orders Table
      `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT 1,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        shipping_address TEXT NOT NULL,
        shipping_name VARCHAR(255) NOT NULL,
        shipping_phone VARCHAR(20) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Order Items Table
      `CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Users Table (bonus feature)
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Wishlist Table
      `CREATE TABLE IF NOT EXISTS wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT 1,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_product_wishlist (user_id, product_id)
      )`
    ];

    // Execute all queries sequentially to avoid connection limit
    async function executeQueries() {
      for (let i = 0; i < queries.length; i++) {
        try {
          await new Promise((queryResolve, queryReject) => {
            pool.execute(queries[i], (err, results) => {
              if (err) {
                console.error(`Error creating table ${i + 1}:`, err);
                queryReject(err);
              } else {
                queryResolve(results);
              }
            });
          });
        } catch (error) {
          reject(error);
          return;
        }
      }
      console.log('Database tables initialized');
      resolve();
    }

    executeQueries();
  });
}

// Promisify database methods for async/await
const promiseDb = {
  execute: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      pool.execute(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve([results]);
      });
    });
  },
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      pool.execute(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve([{ insertId: results.insertId, affectedRows: results.affectedRows }]);
      });
    });
  },
  getConnection: () => {
    return Promise.resolve({
      execute: promiseDb.execute,
      run: promiseDb.run,
      beginTransaction: () => Promise.resolve(),
      commit: () => Promise.resolve(),
      rollback: () => Promise.resolve(),
      release: () => {}
    });
  },
  initialize: initializeDatabase
};

module.exports = promiseDb;
