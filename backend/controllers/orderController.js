const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total_amount, shipping_address, shipping_name, shipping_phone, user_id } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    if (!shipping_address || !shipping_name || !shipping_phone) {
      return res.status(400).json({ error: 'Shipping information is required' });
    }

    const orderData = {
      user_id: user_id || 1,
      total_amount,
      shipping_address,
      shipping_name,
      shipping_phone,
      items
    };

    const { orderId, orderNumber } = await Order.create(orderData);
    
    res.status(201).json({
      message: 'Order placed successfully',
      orderId,
      orderNumber
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.getByOrderNumber(req.params.orderNumber);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const orders = await Order.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
