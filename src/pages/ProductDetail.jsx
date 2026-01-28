import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weTrack } from '../lib/webengage';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, getCartTotal, getCartCount } = useStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    setProduct(found);

    if (found) {
      weTrack('Product Viewed', {
        product_id: found.id,
        product_name: found.name,
        price: found.price,
        category: found.category
      });
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (!product) return;

    const quantity = 1;
    
    // Calculate new totals for event tracking
    const currentTotal = getCartTotal();
    const currentCount = getCartCount();
    
    const newCartValue = currentTotal + (product.price * quantity);
    const newItemsCount = currentCount + quantity;

    addToCart(product, quantity);

    weTrack('Product Added to Cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: quantity,
      cart_value: newCartValue,
      items_count: newItemsCount
    });

    // Simple toast notification replacement
    const btn = document.getElementById('add-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Added!';
    btn.classList.add('btn-success');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('btn-success');
    }, 1000);
  };

  if (!product) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-outline mb-4" style={{ border: 'none', paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Back to browsing
      </button>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="grid grid-cols-2" style={{ gap: 0 }}>
          {/* Left Column: Image */}
          <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
            />
          </div>

          {/* Right Column: Details */}
          <div style={{ padding: '3rem' }}>
            <div className="text-accent text-small font-bold mb-2 uppercase tracking-wide">{product.category}</div>
            <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-accent">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-muted text-small">(124 reviews)</span>
            </div>

            <div className="price" style={{ fontSize: '2rem', marginBottom: '2rem' }}>${product.price.toFixed(2)}</div>

            <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
              Experience premium quality with our {product.name}. Designed for modern living, 
              featuring durable materials and an ergonomic design that fits perfectly into your lifestyle.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <label className="text-small font-bold mb-2 block">Select Color</label>
              <div className="flex gap-2">
                {['#0f172a', '#475569', '#cbd5e1'].map(color => (
                  <div key={color} style={{ width: 32, height: 32, borderRadius: '50%', background: color, cursor: 'pointer', border: '2px solid white', boxShadow: '0 0 0 1px #e2e8f0' }}></div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                id="add-btn"
                onClick={handleAddToCart} 
                className="btn btn-primary btn-block" 
                style={{ padding: '1rem' }}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 text-small text-muted">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} /> 2 Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
