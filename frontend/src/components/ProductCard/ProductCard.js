import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wishlist/1/check/${product.id}`);
      setIsInWishlist(response.data.isInWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation();
    
    if (loading) return;
    
    setLoading(true);
    
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:5000/api/wishlist/1/${product.id}`);
        setIsInWishlist(false);
      } else {
        await axios.post('http://localhost:5000/api/wishlist', {
          userId: 1,
          productId: product.id
        });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
        />
        
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''} ${loading ? 'loading' : ''}`}
          onClick={toggleWishlist}
          disabled={loading}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist ? '#ff4757' : 'none'}>
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39466C21.7563 5.72722 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="rating-badge">
            {product.rating} ★
          </span>
          <span className="reviews-count">
            ({product.reviews_count.toLocaleString()})
          </span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.original_price && (
            <>
              <span className="original-price">{formatPrice(product.original_price)}</span>
              <span className="discount">{product.discount_percentage}% off</span>
            </>
          )}
        </div>

        {product.brand && (
          <div className="product-brand">{product.brand}</div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
