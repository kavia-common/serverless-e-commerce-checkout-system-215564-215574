import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ocean_shop_cart_v1';

/**
 * PUBLIC_INTERFACE
 * useCartProvider manages cart state with localStorage persistence.
 */
export function useCartProvider() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(curr => {
      const index = curr.findIndex(i => i.id === product.id);
      if (index >= 0) {
        const copy = [...curr];
        copy[index] = { ...copy[index], quantity: copy[index].quantity + qty };
        return copy;
      }
      return [...curr, { ...product, quantity: qty }];
    });
  };

  const removeItem = (id) => {
    setItems(curr => curr.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setItems(curr => curr.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + (i.price || 0) * i.quantity, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, subtotal };
}
