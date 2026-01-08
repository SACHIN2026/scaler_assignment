import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Wishlist.css';

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/wishlist/1'); // Default user_id = 1
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/wishlist/1/${productId}`);
            setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const addToCart = async (product) => {
        try {
            await axios.post('http://localhost:5000/api/cart', {
                product_id: product.id,
                quantity: 1
            });
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading wishlist...</div>;
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="empty-wishlist">
                <h2>Your Wishlist is Empty</h2>
                <p>Add items to your wishlist by clicking the heart icon on products</p>
                <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1>My Wishlist ({wishlistItems.length} items)</h1>
            </div>
            
            <div className="wishlist-items">
                {wishlistItems.map((item) => (
                    <div key={item.product_id} className="wishlist-item">
                        <img src={item.image_url} alt={item.name} />
                        
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="item-brand">{item.brand}</p>
                            <p className="item-description">{item.description}</p>
                            
                            <div className="item-rating">
                                <span className="rating">{item.rating}★</span>
                                <span className="reviews">({item.reviews_count} reviews)</span>
                            </div>
                        </div>
                        
                        <div className="item-price">
                            <span className="current-price">₹{item.price.toLocaleString()}</span>
                            {item.original_price && item.original_price > item.price && (
                                <>
                                    <span className="original-price">₹{item.original_price.toLocaleString()}</span>
                                    <span className="discount">{item.discount_percentage}% off</span>
                                </>
                            )}
                        </div>
                        
                        <div className="item-actions">
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </button>
                            
                            <button 
                                className="remove-btn"
                                onClick={() => removeFromWishlist(item.product_id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;