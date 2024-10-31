import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import allProduct from '../Assets/allProduct';
import { auth } from '../config/firebase';

export const AuthContext = createContext(null); 

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < allProduct.length; i++) {
        cart[i] = 0; 
    }
    return cart;
};

export default function AuthContextProvider(props) {

  const [cartItem, setCartItem] = useState(getDefaultCart());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if(user){
        setIsAuthenticated(true);
        setUser(user);
      }
       else {
        setIsAuthenticated(false);
        setUser(null);
      }
    })
    return () => unsubscribe(); 
  },[])

  const clearCart = () => {
    setCartItem(getDefaultCart());
  };

  const addToCart = (productId) => {
    setCartItem((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1 
    }));
    window.notify('Item has been successfully add into cart', 'success')
  };

  const getTotalCartItems = () => {
    return Object.values(cartItem).reduce((total, count) => total + count, 0);
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({...prev, [itemId]: prev[itemId] -1 }))
  }
  const contextValue = {
    allProduct,
    removeFromCart,
    clearCart,
    cartItem,
    addToCart,
    getTotalCartItems,
    isAuthenticated,
    setIsAuthenticated, 
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  );
}
