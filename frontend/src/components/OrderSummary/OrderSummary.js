import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ items, shippingDetails, onConfirm, onCancel, loading }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item.discount_percentage 
        ? item.price 
        : item.original_price || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return items.reduce((savings, item) => {
      if (item.original_price && item.original_price > item.price) {
        return savings + ((item.original_price - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const total = calculateTotal();
  const savings = calculateSavings();
  const deliveryCharges = total > 500 ? 0 : 40;
  const finalAmount = total + deliveryCharges;

  return (
    <div className="order-summary-overlay">
      <div className="order-summary-modal">
        <div className="order-summary-header">
          <h2>Order Summary</h2>
          <p>Review your order before placing</p>
        </div>

        <div className="order-summary-content">
          {/* Items List */}
          <div className="summary-section">
            <h3>Items ({items.length})</h3>
            <div className="items-list">
              {items.map((item) => (
                <div key={item.id || item.product_id} className="summary-item">
                  <img src={item.image_url} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <div className="item-price">
                      <span className="current-price">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      {item.original_price && item.original_price > item.price && (
                        <span className="original-price">
                          ₹{(item.original_price * item.quantity).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="summary-section">
            <h3>Shipping Address</h3>
            <div className="shipping-address">
              <p><strong>{shippingDetails.name}</strong></p>
              <p>{shippingDetails.address}</p>
              <p>{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
              <p>Phone: {shippingDetails.phone}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="summary-section">
            <h3>Price Details</h3>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Price ({items.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="price-row savings">
                  <span>Discount</span>
                  <span>-₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="price-row">
                <span>Delivery Charges</span>
                <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
              </div>
              {deliveryCharges === 0 && (
                <small className="free-delivery-note">Free delivery on orders above ₹500</small>
              )}
              <div className="price-row total">
                <span><strong>Total Amount</strong></span>
                <span><strong>₹{finalAmount.toLocaleString()}</strong></span>
              </div>
              {savings > 0 && (
                <div className="total-savings">
                  You will save ₹{savings.toLocaleString()} on this order
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="order-summary-actions">
          <button 
            className="cancel-btn" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="confirm-btn" 
            onClick={() => onConfirm(finalAmount)}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : `Place Order ₹${finalAmount.toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;