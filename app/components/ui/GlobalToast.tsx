"use client";

import { useShop } from "../../context/ShopContext";

export default function GlobalToast() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="globalToast">
      {toastMessage}
    </div>
  );
}
