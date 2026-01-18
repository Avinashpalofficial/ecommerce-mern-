import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCartItem((prev) => {
      const existing = prev.find(
        (item) => (item._id || item.id) === productId
      );

      // already cart me hai → qty badhao
      if (existing) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      // pehli baar add → new item
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCartItem((prev) =>
      prev.filter((item) => (item._id || item.id) !== id)
    );
  };

  // UPDATE QTY
  const updateQty = (id, qty) => {
    setCartItem((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
