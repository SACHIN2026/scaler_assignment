import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import BuyNowCheckout from './components/BuyNowCheckout/BuyNowCheckout';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import Wishlist from './components/Wishlist';
import { getCart } from './services/api';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const cartItems = await getCart();
      setCartCount(cartItems.length);
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail updateCartCount={updateCartCount} />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          <Route path="/checkout" element={<Checkout updateCartCount={updateCartCount} />} />
          <Route path="/buy-now-checkout" element={<BuyNowCheckout />} />
          <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
