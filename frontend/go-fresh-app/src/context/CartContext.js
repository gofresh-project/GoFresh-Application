import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.vendorId === item.vendorId
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId &&
          i.vendorId === item.vendorId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (productId, vendorId) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.vendorId === vendorId)
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
