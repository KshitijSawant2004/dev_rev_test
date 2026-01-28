import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weLogout, weTrack } from '../lib/webengage';
import { ShoppingBag, User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout, getCartCount } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartCount();

  const handleLogout = () => {
    weTrack('Logout');
    weLogout();
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          <Package size={24} />
          <span>LuxeMarket</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Products
          </Link>
          
          <Link to="/cart" className={`nav-link ${isActive('/cart')}`} style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="badge" style={{ position: 'absolute', top: -8, right: -8 }}>
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="nav-link" style={{ cursor: 'default' }}>
                <User size={20} />
                <span className="text-small">{user.name.split(' ')[0]}</span>
              </span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
