import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Home = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derive categories from products
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Summer Collection 2026</h1>
        <p>Discover the latest trends in electronics, fashion, and lifestyle. Curated just for you.</p>
        <button className="btn btn-accent">Shop New Arrivals</button>
      </div>

      <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="filters">
          {categories.map(cat => (
            <div 
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: 10, top: 10, color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <h3 className="text-muted">No products found</h3>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
