import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/api';
import OrderSummary from '../OrderSummary/OrderSummary';
import './BuyNowCheckout.css';

const BuyNowCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    return product.price * quantity;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show order summary
    setShowOrderSummary(true);
  };

  const confirmOrder = async (finalAmount) => {
    try {
      setPlacing(true);

      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

      const orderData = {
        items: [{
          product_id: product.id,
          quantity: quantity,
          price: product.price
        }],
        total_amount: finalAmount,
        shipping_address: shippingAddress,
        shipping_name: formData.name,
        shipping_phone: formData.phone
      };

      const response = await createOrder(orderData);

      // Navigate to confirmation page
      navigate(`/order-confirmation/${response.orderNumber}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
      setPlacing(false);
    }
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const itemsForSummary = [{
    ...product,
    quantity: quantity,
    product_id: product.id
  }];

  return (
    <div className="buy-now-checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h1>Buy Now - Checkout</h1>
          
          <div className="product-summary">
            <img src={product.image_url} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="price-info">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <span className="original-price">{formatPrice(product.original_price)}</span>
                    <span className="discount">{product.discount_percentage}% off</span>
                  </>
                )}
              </div>
              <div className="quantity-selector">
                <label>Quantity:</label>
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'error' : ''}
                    rows="3"
                  ></textarea>
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={loading}
              >
                Review Order {formatPrice(calculateTotal())}
              </button>
            </div>
          </form>
        </div>

        <div className="order-summary-sidebar">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <img src={product.image_url} alt={product.name} />
            <div className="item-info">
              <p className="item-name">{product.name}</p>
              <p className="item-quantity">Qty: {quantity}</p>
              <p className="item-price">{formatPrice(product.price * quantity)}</p>
            </div>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span className="amount">{formatPrice(calculateTotal())}</span>
          </div>
        </div>
      </div>

      {showOrderSummary && (
        <OrderSummary
          items={itemsForSummary}
          shippingDetails={formData}
          onConfirm={confirmOrder}
          onCancel={() => setShowOrderSummary(false)}
          loading={placing}
        />
      )}
    </div>
  );
};

export default BuyNowCheckout;