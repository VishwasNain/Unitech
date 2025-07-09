import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...product, quantity }]);
    }
    updateTotalPrice();
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    updateTotalPrice();
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    setTotalPrice(
      cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    );
  };

  useEffect(() => {
    updateTotalPrice();
  }, [cartItems]);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        totalPrice, 
        addToCart, 
        removeFromCart, 
        updateQuantity 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
