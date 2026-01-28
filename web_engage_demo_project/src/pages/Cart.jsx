import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weTrack } from '../lib/webengage';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, getCartCount, clearCart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    weTrack('Cart Viewed', {
      cart_value: getCartTotal(),
      items_count: getCartCount()
    });
  }, [cart]);

  const handleProceed = () => {
    weTrack('Checkout Started', {
      cart_value: getCartTotal(),
      items_count: getCartCount()
    });
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Shopping Cart ({getCartCount()} items)</h1>
      
      <div className="grid grid-cols-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        
        {/* Cart Items List */}
        <div className="card">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <div className="flex justify-between mb-2">
                  <h3 style={{ fontSize: '1.125rem' }}>{item.name}</h3>
                  <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <p className="text-muted text-small">{item.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-small text-muted">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="btn btn-outline" 
                    style={{ padding: '0.25rem 0.5rem', color: '#ef4444', borderColor: '#fee2e2' }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
             <button onClick={clearCart} className="text-small text-muted" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear All</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-muted">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-muted">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-4 text-muted">
              <span>Tax (Estimated)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between mb-6" style={{ fontSize: '1.25rem', fontWeight: 700, borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            <button onClick={handleProceed} className="btn btn-primary btn-block" style={{ padding: '1rem' }}>
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
