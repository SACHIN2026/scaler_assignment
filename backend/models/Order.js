const db = require('../config/database');

class Order {
  static async create(orderData) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Generate order number
      const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);

      // Create order
      const [orderResult] = await connection.run(
        `INSERT INTO orders (user_id, order_number, total_amount, shipping_address, 
         shipping_name, shipping_phone, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderData.user_id || 1,
          orderNumber,
          orderData.total_amount,
          orderData.shipping_address,
          orderData.shipping_name,
          orderData.shipping_phone,
          'pending'
        ]
      );

      const orderId = orderResult.insertId;

      // Create order items
      for (const item of orderData.items) {
        await connection.run(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.price]
        );
      }

      await connection.commit();
      return { orderId, orderNumber };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getById(orderId) {
    try {
      const [orders] = await db.execute(
        `SELECT * FROM orders WHERE id = ?`,
        [orderId]
      );

      if (orders.length === 0) return null;

      const order = orders[0];

      const [items] = await db.execute(
        `SELECT oi.*, p.name, p.image_url 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [orderId]
      );

      order.items = items;
      return order;
    } catch (error) {
      throw error;
    }
  }

  static async getByOrderNumber(orderNumber) {
    try {
      const [orders] = await db.execute(
        `SELECT * FROM orders WHERE order_number = ?`,
        [orderNumber]
      );

      if (orders.length === 0) return null;

      const order = orders[0];

      const [items] = await db.execute(
        `SELECT oi.*, p.name, p.image_url 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );

      order.items = items;
      return order;
    } catch (error) {
      throw error;
    }
  }

  static async getOrdersByUser(userId = 1) {
    try {
      const [orders] = await db.execute(
        `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
        [userId]
      );

      // Get items for each order
      for (const order of orders) {
        const [items] = await db.execute(
          `SELECT oi.*, p.name, p.image_url 
           FROM order_items oi 
           JOIN products p ON oi.product_id = p.id 
           WHERE oi.order_id = ?`,
          [order.id]
        );
        order.items = items;
      }

      return orders;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;
