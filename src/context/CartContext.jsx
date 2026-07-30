import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (medicineId, quantity = 1) => {
    const { data } = await api.post("/cart", { medicineId, quantity });
    setCart(data);
    return data;
  };

  const updateCartItem = async (medicineId, quantity) => {
    const { data } = await api.put(`/cart/${medicineId}`, { quantity });
    setCart(data);
    return data;
  };

  const removeFromCart = async (medicineId) => {
    const { data } = await api.delete(`/cart/${medicineId}`);
    setCart(data);
    return data;
  };

  const clearCartLocal = () => setCart({ items: [] });

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartTotal =
    cart.items?.reduce((sum, item) => sum + (item.medicine?.price || 0) * item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCartLocal,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
