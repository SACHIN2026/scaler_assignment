import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../../services/api';
import './Cart.css';

const Cart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(cartId, newQuantity);
      await loadCart();
      await updateCartCount();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (cartId) => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await removeFromCart(cartId);
        await loadCart();
        await updateCartCount();
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      const discount = item.original_price ? (item.original_price - item.price) * item.quantity : 0;
      return sum + discount;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <path d="M9 2L7 6H3C2.44772 6 2 6.44772 2 7V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V7C22 6.44772 21.5523 6 21 6H17L15 2H9Z" stroke="#878787" strokeWidth="1.5"/>
          </svg>
          <h2>Your cart is empty!</h2>
          <p>Add items to it now.</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <h2>My Cart ({cartItems.length})</h2>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image_url} alt={item.name} />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>

                <div className="item-price">
                  <span className="current-price">{formatPrice(item.price)}</span>
                  {item.original_price && (
                    <>
                      <span className="original-price">{formatPrice(item.original_price)}</span>
                      <span className="discount">{item.discount_percentage}% off</span>
                    </>
                  )}
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>PRICE DETAILS</h3>

          <div className="summary-row">
            <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
            <span>{formatPrice(calculateSubtotal() + calculateDiscount())}</span>
          </div>

          {calculateDiscount() > 0 && (
            <div className="summary-row discount-row">
              <span>Discount</span>
              <span className="discount-amount">- {formatPrice(calculateDiscount())}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span className="free">FREE</span>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>

          {calculateDiscount() > 0 && (
            <div className="savings">
              You will save {formatPrice(calculateDiscount())} on this order
            </div>
          )}

          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
