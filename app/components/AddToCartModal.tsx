"use client";

import { useShop } from "../context/ShopContext";
import { useState } from "react";

type Props = {
  product: any;
  onClose: () => void;
};

export default function AddToCartModal({ product, onClose }: Props) {
  const { addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  if (!product) return null;

  return (
    <div className="cartOverlay">
      <div className="cartModal">
        <button className="closeBtn" onClick={onClose}>
          ✕
        </button>

        <div className="cartModalContent">
          <img
            src={product.image}
            alt={product.title}
            className="cartModalImage"
          />

          <h3>{product.title}</h3>
          <p className="modalPrice">₹{product.price}</p>

          <p>Select Size</p>

          <div className="sizeOptions">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`sizeBtn ${
                  selectedSize === size ? "activeSize" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            className="confirmBtn"
            disabled={!selectedSize}
            onClick={() => {
  addToCart(product.image, selectedSize!, product.price);
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
    onClose();
  }, 2000);
}}
>
            Add to Cart 🛒
          </button>
        </div>
        {showToast && (
  <div className="cartToast">
    ✅ Added to cart successfully
  </div>
)}
      </div>
    </div>
  );
}
