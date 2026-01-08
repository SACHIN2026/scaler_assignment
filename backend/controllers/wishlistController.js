const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId || 1;
    const wishlistItems = await Wishlist.getWishlistItems(userId);
    res.json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId, userId = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const result = await Wishlist.addToWishlist(userId, productId);
    
    if (result.message) {
      return res.status(409).json(result);
    }

    res.status(201).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const removed = await Wishlist.removeFromWishlist(wishlistId);
    
    if (!removed) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.json({ message: 'Item removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};

exports.removeByProductId = async (req, res) => {
  try {
    const userId = req.params.userId || 1;
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const removed = await Wishlist.removeByProductId(userId, productId);
    
    if (!removed) {
      return res.status(404).json({ error: 'Item not found in wishlist' });
    }

    res.json({ message: 'Item removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};

exports.checkWishlistStatus = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.params.userId || 1;

    const isInWishlist = await Wishlist.isInWishlist(userId, productId);
    res.json({ isInWishlist });
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    res.status(500).json({ error: 'Failed to check wishlist status' });
  }
};