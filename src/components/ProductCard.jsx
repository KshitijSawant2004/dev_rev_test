import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card" style={{ height: '100%' }}>
        <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s' 
            }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body" style={{ padding: '1rem' }}>
          <p className="text-small text-muted" style={{ marginBottom: '0.25rem' }}>{product.category}</p>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{product.name}</h3>
          <div className="flex justify-between items-center mt-4">
            <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>${product.price.toFixed(2)}</span>
            <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '50%' }}>
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
