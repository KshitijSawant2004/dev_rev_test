import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weTrack } from '../lib/webengage';
import { CreditCard, Truck, Lock } from 'lucide-react';

const Checkout = () => {
  const { getCartTotal, getCartCount, user } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(false);

  const total = getCartTotal();

  const handlePay = () => {
    if (total <= 0) return;

    setLoading(true);

    weTrack('Payment Initiated', {
      cart_value: total,
      payment_method: paymentMethod
    });

    setTimeout(() => {
      setLoading(false);
      const orderId = 'ORD_' + Date.now();
      
      navigate('/order-success', { 
        state: { 
          orderId, 
          amount: total,
          paymentMethod,
          itemsCount: getCartCount()
        }
      });
    }, 1500);
  };

  if (total === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">Shop Now</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4">Secure Checkout</h1>
      
      <div className="grid grid-cols-2" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Forms */}
        <div className="card">
          <div className="card-body">
            
            {/* Shipping Info */}
            <div className="mb-4">
              <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.1rem' }}>
                <Truck size={18} /> Shipping Information
              </h3>
              {!user && (
                <div style={{ padding: '0.75rem', background: '#fff7ed', color: '#c2410c', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Checking out as Guest. <span onClick={() => navigate('/login')} style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Login</span> to save details.
                </div>
              )}
              <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                 <input type="text" placeholder="First Name" defaultValue={user?.name?.split(' ')[0] || ''} />
                 <input type="text" placeholder="Last Name" defaultValue={user?.name?.split(' ')[1] || ''} />
              </div>
              <input type="text" placeholder="Address" defaultValue="123 Demo Street" className="mb-4" />
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                 <input type="text" placeholder="City" defaultValue="Tech City" />
                 <input type="text" placeholder="ZIP Code" defaultValue="560001" />
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '2rem 0' }} />

            {/* Payment Info */}
            <div>
              <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.1rem' }}>
                <CreditCard size={18} /> Payment Method
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Credit Card', 'UPI', 'COD'].map(method => (
                  <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value={method} 
                      checked={paymentMethod === method} 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      style={{ width: 'auto' }}
                    />
                    <span style={{ fontWeight: 500 }}>{method}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-body">
            <h3 className="mb-4">Order Total</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-6" style={{ fontSize: '1.25rem', fontWeight: 700, borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePay} 
              disabled={loading} 
              className="btn btn-primary btn-block" 
              style={{ padding: '1rem', fontSize: '1rem' }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock size={16} /> Pay ${total.toFixed(2)}
                </span>
              )}
            </button>
            
            <p className="text-muted text-small text-center mt-4">
              <Lock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Payments are secure and encrypted.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
