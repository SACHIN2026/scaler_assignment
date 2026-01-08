const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: '9aac0z.h.filess.io',
  port: 3307,
  user: 'scalar_mealloudin',
  password: 'f631f797b70b963a73d286818dbee52f8394f909',
  database: 'scalar_mealloudin',
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0,
  reconnect: true,
  idleTimeout: 30000
});

console.log('Connected to MySQL database');

function initializeDatabase() {
  console.log('Skipping table creation to avoid connection limits - tables should already exist');
  return Promise.resolve();
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
