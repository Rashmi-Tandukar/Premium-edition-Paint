import { createContext, useContext, useState, useCallback } from 'react';
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback((product, selectedSize) => {
    const key = `${product.id}-${selectedSize || ''}`;
    setCartItems(prev => {
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, key, selectedSize, qty: 1 }];
    });
    addToast(`${product.name} added to cart 🛒`);
    setCartOpen(true);
  }, [addToast]);

  const removeFromCart = useCallback((key) => setCartItems(prev => prev.filter(i => i.key !== key)), []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) { removeFromCart(key); return; }
    setCartItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, [removeFromCart]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      if (has) { addToast(`${product.name} removed from wishlist`); return prev.filter(i => i.id !== product.id); }
      addToast(`${product.name} saved to wishlist ❤️`);
      return [...prev, product];
    });
  }, [addToast]);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => {
    const num = parseFloat(String(i.price).replace(/[^0-9.]/g, '')) || 0;
    return s + num * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, cartTotal,
      cartOpen, setCartOpen,
      addToCart, removeFromCart, updateQty,
      wishlist, wishlistCount: wishlist.length, toggleWishlist, isWishlisted,
      toasts
    }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
