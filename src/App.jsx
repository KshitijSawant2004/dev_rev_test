import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import { weTrack } from './lib/webengage';

function App() {
  const location = useLocation();

  // Track Page Viewed on route change
  useEffect(() => {
    // D) On every route change, automatically fire "Page Viewed"
    // C.1 "Page Viewed" -> { page_name, path }
    const pageName = getPageName(location.pathname);
    weTrack('Page Viewed', {
      page_name: pageName,
      path: location.pathname
    });
  }, [location]);

  const getPageName = (path) => {
    if (path === '/') return 'Home';
    if (path.startsWith('/product/')) return 'Product Detail';
    if (path === '/cart') return 'Cart';
    if (path === '/checkout') return 'Checkout';
    if (path === '/order-success') return 'Order Success';
    if (path === '/login') return 'Login';
    return 'Unknown';
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
