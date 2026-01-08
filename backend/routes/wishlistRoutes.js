const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Get user wishlist - GET /api/wishlist/:userId
router.get('/:userId', wishlistController.getWishlist);

// Add to wishlist - POST /api/wishlist
router.post('/', wishlistController.addToWishlist);

// Remove from wishlist by user and product ID - DELETE /api/wishlist/:userId/:productId
router.delete('/:userId/:productId', wishlistController.removeByProductId);

// Check if product is in wishlist - GET /api/wishlist/:userId/check/:productId
router.get('/:userId/check/:productId', wishlistController.checkWishlistStatus);

module.exports = router;