import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = ({ updateCartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
      await updateCartCount();
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    // Navigate to checkout with product data
    navigate('/buy-now-checkout', {
      state: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          original_price: product.original_price,
          discount_percentage: product.discount_percentage,
          image_url: product.image_url,
          quantity: 1
        }
      }
    });
  };

  if (loading) {
    return <div className="loading-detail">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const images = product.images || [product.image_url];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-images">
          <div className="image-gallery">
            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={images[currentImageIndex]} alt={product.name} />
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-cart"
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 2L7 6H3C2.44772 6 2 6.44772 2 7V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V7C22 6.44772 21.5523 6 21 6H17L15 2H9Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {addingToCart ? 'Adding...' : 'ADD TO CART'}
            </button>
            <button
              className="btn btn-buy"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              BUY NOW
            </button>
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating-section">
            <span className="rating-badge">
              {product.rating} ★
            </span>
            <span className="reviews-text">
              {product.reviews_count.toLocaleString()} Ratings & Reviews
            </span>
          </div>

          <div className="product-pricing">
            <span className="special-price">Special Price</span>
            <div className="price-row">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="original-price">{formatPrice(product.original_price)}</span>
                  <span className="discount">{product.discount_percentage}% off</span>
                </>
              )}
            </div>
          </div>

          {product.stock > 0 ? (
            <div className="availability available">
              <span className="status-dot"></span>
              In Stock ({product.stock} available)
            </div>
          ) : (
            <div className="availability out-of-stock">
              <span className="status-dot"></span>
              Out of Stock
            </div>
          )}

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="specifications">
              <h3>Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {product.brand && (
            <div className="product-meta">
              <span className="meta-label">Brand:</span>
              <span className="meta-value">{product.brand}</span>
            </div>
          )}

          {product.category_name && (
            <div className="product-meta">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category_name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
