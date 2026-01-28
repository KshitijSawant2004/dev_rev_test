import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weTrack } from '../lib/webengage';

const OrderSuccess = () => {
  const { state } = useLocation();
  const { clearCart } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.orderId) {
      // C.8 "Order Completed" -> { order_id, amount, currency, payment_method, items_count }
      weTrack('Order Completed', {
        order_id: state.orderId,
        amount: state.amount,
        currency: 'USD',
        payment_method: state.paymentMethod,
        items_count: state.itemsCount
      });

      // Clear cart after tracking
      clearCart();
    }
  }, [state]); // Run once when state is available

  if (!state || !state.orderId) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No Order Found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '50px auto' }}>
      <div style={{ fontSize: '4em', color: 'green', marginBottom: '20px' }}>✓</div>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your purchase.</p>
      
      <div className="card" style={{ marginTop: '30px', textAlign: 'left' }}>
        <div className="card-body">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {state.orderId}</p>
          <p><strong>Amount:</strong> ${state.amount.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {state.paymentMethod}</p>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '30px' }}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
