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
  name: string;
  img: string;
  qty: number;
  price: number;
  size: string;
  rating?: number;
};

type ShopContextType = {
  favorites: string[];
  cart: CartItem[];
  toggleFavorite: (img: string) => void;
  addToCart: (
    img: string,
    size: string,
    price: number,
    name: string
  ) => void;
  removeFromCart: (img: string, size: string) => void;
  updateQty: (img: string, size: string, qty: number) => void;
  clearCart: () => void;
  totalPrice: number;
  toastMessage: string | null;
};

const ShopContext = createContext<ShopContextType>({
  favorites: [],
  cart: [],
  toggleFavorite: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalPrice: 0,
  toastMessage: null,
});

/* ================= PROVIDER ================= */

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

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

    if (crt) {
      const parsed = JSON.parse(crt);

      const cleanCart: CartItem[] = parsed.map((item: any) => ({
        name: item.name || "",
        img: item.img,
        size: item.size,
        price: Number(item.price) || 0,
        qty: Number(item.qty) || 1,
      }));

      setCart(cleanCart);
    }
  }, []);

  /* ===== Save to storage ===== */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= ACTIONS ================= */

  const toggleFavorite = (img: string) => {
    setFavorites((prev) => {
      const isAlready = prev.includes(img);

      if (isAlready) {
        showToast("❌ Removed from favorites");
        return prev.filter((i) => i !== img);
      } else {
        showToast("❤️ Added to favorites");
        return [...prev, img];
      }
    });
  };

  const addToCart = (
    img: string,
    size: string,
    price: number,
    name: string
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (p) => p.img === img && p.size === size
      );

      if (existingItem) {
        showToast("🛒 Quantity updated in cart");
        return prev.map((p) =>
          p.img === img && p.size === size
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      showToast("✅ Added to cart successfully");

      return [
        ...prev,
        {
          name,
          img,
          size,
          price,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (img: string, size: string) => {
    setCart((prev) =>
      prev.filter((p) => !(p.img === img && p.size === size))
    );
    showToast("❌ Item removed from cart");
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
    showToast("🧾 Order placed successfully");
  }, []);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

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
      toastMessage,
    }}
  >
    {children}

    {/* 🔔 TOAST UI */}
    {toastMessage && (
      <div className="fixed top-6 right-6 z-50 
                      bg-black text-white 
                      px-6 py-3 rounded-lg 
                      shadow-lg animate-slideIn">
        {toastMessage}
      </div>
    )}
  </ShopContext.Provider>
);
}

/* ================= HOOK ================= */

export function useShop() {
  return useContext(ShopContext);
}
