import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Product = {
  id: string;
  name: string;
  brand: string;
  tool_type: string;
  material: string;
  coating: string;
  cutting_dia: string;
  shank_dia: string;
  overall_length: string;
  insert_size: string;
  workpiece_material: string;
  quantity: number;
  price: number;
  application_notes: string;
};

type CartItem = Product & {
  cart_quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, newQuantity: number) => void;
  getCartItemCount: () => number;
  getCartQuantity: (productId: string) => number;
  clearCart: () => void;
  getCartTotals: () => { subtotal: number; gst: number; shipping: number; total: number };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cart_quantity: Math.min(item.cart_quantity + quantity, product.quantity) }
            : item
        );
      }
      return [...prevCart, { ...product, cart_quantity: quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, cart_quantity: Math.min(newQuantity, item.quantity) }
          : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.cart_quantity, 0);
  };

  const getCartQuantity = (productId: string) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.cart_quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.cart_quantity), 0);
    const gst = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 1000000 ? 0 : 50000; // Free shipping above 10 lakhs
    const total = subtotal + gst + shipping;
    return { subtotal, gst, shipping, total };
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      getCartItemCount,
      getCartQuantity,
      clearCart,
      getCartTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
