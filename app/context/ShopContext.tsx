"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

/* ================= TYPES ================= */

type CartItem = {
  img: string;
  qty: number;
  price: number;
  size: string;
};

type ShopContextType = {
  favorites: string[];
  cart: CartItem[];
  toggleFavorite: (img: string) => void;
  addToCart: (img: string, size: string) => void;
  removeFromCart: (img: string, size: string) => void;
  updateQty: (img: string, qty: number, size: string) => void;
  clearCart: () => void;
  totalPrice: number;
};

/* ================= CONTEXT ================= */

// ❌ DO NOT use `| null`
const ShopContext = createContext<ShopContextType>({
  favorites: [],
  cart: [],
  toggleFavorite: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalPrice: 0,
});

/* ================= PROVIDER ================= */

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ===== Load from storage ===== */
  useEffect(() => {
    const paymentSuccess = sessionStorage.getItem("payment_success");

    if (paymentSuccess) {
      sessionStorage.removeItem("payment_success");
      return;
    }

    const fav = localStorage.getItem("favorites");
    const crt = localStorage.getItem("cart");

    if (fav) setFavorites(JSON.parse(fav));
    if (crt) setCart(JSON.parse(crt));
  }, []);

  /* ===== Save to storage ===== */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ===== Actions ===== */

  const toggleFavorite = (img: string) => {
    setFavorites((prev) =>
      prev.includes(img)
        ? prev.filter((i) => i !== img)
        : [...prev, img]
    );
  };

  const addToCart = (img: string, size: string) => {
  setCart((prev) => {
    const existingItem = prev.find(
      (p) => p.img === img && p.size === size
    );

    if (existingItem) {
      return prev.map((p) =>
        p.img === img && p.size === size
          ? { ...p, qty: p.qty + 1 }
          : p
      );
    }

    return [...prev, { img, qty: 1, price: 1499, size }];
  });
};

  const removeFromCart = (img: string, size: string) => {
  setCart((prev) =>
    prev.filter((p) => !(p.img === img && p.size === size))
  );
};

  const updateQty = (img: string, size: string, qty: number) => {
  setCart((prev) =>
    prev.map((p) =>
      p.img === img && p.size === size
        ? { ...p, qty: Math.max(1, qty) }
        : p
    )
  );
};
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
    sessionStorage.setItem("payment_success", "true");
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        toggleFavorite,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useShop() {
  return useContext(ShopContext);
}
