"use client";

import { useShop } from "../context/ShopContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const { cart, totalPrice, clearCart } = useShop();
  const router = useRouter();
  const searchParams = useSearchParams();

  const method = searchParams.get("method");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const address = searchParams.get("address");
  const city = searchParams.get("city");

  const finalAmount = totalPrice + 119;

  useEffect(() => {
    const createOrder = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/cart");
        return;
      }

      if (!cart || cart.length === 0) {
        alert("Cart is empty");
        router.push("/cart");
        return;
      }

      try {
        const response = await fetch("http://localhost:5050/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart.map(item => ({
              img: item.img,
              qty: item.qty,
              price: item.price,
              size: item.size,
            })),
            totalAmount: finalAmount,
            paymentMethod: method?.toUpperCase(),
            address: {
              name: name || "",
              phone: phone || "",
              address: address || "",
              city: city || "",
            },
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          alert("Order failed");
          router.push("/cart");
          return;
        }

        clearCart();
        router.push(`/order-success?id=${data.data._id}`);

      } catch (error) {
        console.error("Payment error:", error);
        alert("Server error");
        router.push("/cart");
      }
    };

    if (method) {
      createOrder();
    } else {
      router.push("/cart");
    }

  }, []);

  return (
    <div style={{ padding: 80, textAlign: "center" }}>
      <h2>Processing Payment...</h2>
      <p>Please wait while we complete your transaction.</p>
    </div>
  );
}