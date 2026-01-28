import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 199.00, category: 'Electronics', image: 'https://placehold.co/150?text=Headphones' },
  { id: 2, name: 'Smart Watch', price: 299.50, category: 'Electronics', image: 'https://placehold.co/150?text=Watch' },
  { id: 3, name: 'Running Shoes', price: 89.99, category: 'Apparel', image: 'https://placehold.co/150?text=Shoes' },
  { id: 4, name: 'Backpack', price: 49.00, category: 'Accessories', image: 'https://placehold.co/150?text=Backpack' },
  { id: 5, name: 'Coffee Maker', price: 120.00, category: 'Home', image: 'https://placehold.co/150?text=Coffee' },
];

export const StoreProvider = ({ children }) => {
  const [products] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('we_demo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('we_demo_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('we_demo_user');
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      user,
      login,
      logout,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};
