const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const cartItems = await Cart.getCartItems(userId);
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.body.userId || 1;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    await Cart.addToCart(userId, productId, quantity || 1);
    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartId = req.params.id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const updated = await Cart.updateQuantity(cartId, quantity);
    if (!updated) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const removed = await Cart.removeFromCart(cartId);
    
    if (!removed) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.body.userId || 1;
    await Cart.clearCart(userId);
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
