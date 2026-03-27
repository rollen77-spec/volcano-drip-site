import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { formatCurrency } from '@/api/EcommerceApi.js';

const CartContext = createContext();

const CART_STORAGE_KEY = 'e-commerce-cart';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, variant, quantity, availableQuantity, grind = "Whole Bean (not ground)", giftDetails = null) => {
    return new Promise((resolve, reject) => {
      if (variant.manage_inventory) {
        const currentVariantQuantity = cartItems
          .filter(item => item.variant.id === variant.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        if ((currentVariantQuantity + quantity) > availableQuantity) {
          const error = new Error(`Not enough stock for ${product.title}. Only ${availableQuantity} left.`);
          reject(error);
          return;
        }
      }

      setCartItems(prevItems => {
        const giftKey = giftDetails ? JSON.stringify(giftDetails) : 'no-gift';
        
        const existingItemIndex = prevItems.findIndex(
          item => item.variant.id === variant.id && 
                  item.grind === grind && 
                  (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === giftKey
        );

        if (existingItemIndex > -1) {
          const newItems = [...prevItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity
          };
          return newItems;
        }
        
        return [...prevItems, { product, variant, quantity, grind, giftDetails }];
      });
      resolve();
    });
  }, [cartItems]);

  const removeFromCart = useCallback((variantId, grind, giftDetails = null) => {
    const giftKey = giftDetails ? JSON.stringify(giftDetails) : 'no-gift';
    setCartItems(prevItems => 
      prevItems.filter(item => !(
        item.variant.id === variantId && 
        item.grind === grind && 
        (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === giftKey
      ))
    );
  }, []);

  const updateQuantity = useCallback((variantId, grind, quantity, giftDetails = null) => {
    const giftKey = giftDetails ? JSON.stringify(giftDetails) : 'no-gift';
    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.variant.id === variantId && 
         item.grind === grind && 
         (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === giftKey) 
          ? { ...item, quantity } 
          : item
      )
    );
  }, []);

  const updateGrind = useCallback((variantId, oldGrind, newGrind, giftDetails = null) => {
    if (oldGrind === newGrind) return;
    const giftKey = giftDetails ? JSON.stringify(giftDetails) : 'no-gift';

    setCartItems(prevItems => {
      const currentItemIndex = prevItems.findIndex(
        item => item.variant.id === variantId && 
                item.grind === oldGrind && 
                (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === giftKey
      );
      
      if (currentItemIndex === -1) return prevItems;
      
      const currentItem = prevItems[currentItemIndex];
      
      const targetItemIndex = prevItems.findIndex(
        item => item.variant.id === variantId && 
                item.grind === newGrind && 
                (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === giftKey
      );
      
      let newItems = [...prevItems];
      
      if (targetItemIndex > -1) {
        newItems[targetItemIndex] = {
          ...newItems[targetItemIndex],
          quantity: newItems[targetItemIndex].quantity + currentItem.quantity
        };
        newItems.splice(currentItemIndex, 1);
      } else {
        newItems[currentItemIndex] = {
          ...currentItem,
          grind: newGrind
        };
      }
      
      return newItems;
    });
  }, []);

  const updateGiftDetails = useCallback((variantId, grind, oldGiftDetails, newGiftDetails) => {
    const oldGiftKey = oldGiftDetails ? JSON.stringify(oldGiftDetails) : 'no-gift';
    
    setCartItems(prevItems => {
      const currentItemIndex = prevItems.findIndex(
        item => item.variant.id === variantId && 
                item.grind === grind && 
                (item.giftDetails ? JSON.stringify(item.giftDetails) : 'no-gift') === oldGiftKey
      );
      
      if (currentItemIndex === -1) return prevItems;
      
      let newItems = [...prevItems];
      newItems[currentItemIndex] = {
        ...newItems[currentItemIndex],
        giftDetails: newGiftDetails
      };
      
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    if (cartItems.length === 0) return formatCurrency(0);
    
    return formatCurrency(cartItems.reduce((total, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return total + price * item.quantity;
    }, 0), cartItems[0]?.variant?.currency_info);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateGrind,
    updateGiftDetails,
    clearCart,
    getCartTotal,
  }), [cartItems, cartCount, addToCart, removeFromCart, updateQuantity, updateGrind, updateGiftDetails, clearCart, getCartTotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};