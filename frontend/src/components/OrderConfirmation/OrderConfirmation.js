import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByNumber } from '../../services/api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderNumber]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderByNumber(orderNumber);
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="error-page">
        <h2>Order not found</h2>
        <button onClick={() => navigate('/')} className="home-btn">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-message">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#388e3c" strokeWidth="2"/>
              <path d="M8 12L11 15L16 9" stroke="#388e3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. Your order has been placed successfully.</p>
        </div>

        <div className="order-details-card">
          <div className="order-header">
            <div className="order-info">
              <h2>Order ID: {order.order_number}</h2>
              <p className="order-date">Placed on {formatDate(order.created_at)}</p>
            </div>
            <div className="order-status">
              <span className={`status-badge ${order.status}`}>
                {order.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="shipping-details">
            <h3>Shipping Address</h3>
            <p className="address-name">{order.shipping_name}</p>
            <p className="address-phone">{order.shipping_phone}</p>
            <p className="address-text">{order.shipping_address}</p>
          </div>

          <div className="order-items">
            <h3>Order Items ({order.items.length})</h3>
            <div className="items-list">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
