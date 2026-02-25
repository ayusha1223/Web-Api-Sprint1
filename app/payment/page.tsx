"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShop } from "../context/ShopContext";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useShop();

  const orderId = searchParams.get("id");
  const method = searchParams.get("method"); // cod OR null (esewa)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finalizePayment = async () => {
      if (!orderId) {
        router.push("/cart");
        return;
      }

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        // 🟢 If eSewa → mark paid
        if (!method || method !== "cod") {
          await fetch(
            `http://localhost:5050/api/orders/${orderId}/mark-paid`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        // 🟢 If COD → update status only (optional)
        if (method === "cod") {
          await fetch(
            `http://localhost:5050/api/orders/${orderId}/update-status`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                orderStatus: "Order Placed",
              }),
            }
          );
        }

        clearCart();

        setTimeout(() => {
          router.push(`/order-success?id=${orderId}`);
        }, 1500);

      } catch (err) {
        console.error("Payment finalize error:", err);
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    finalizePayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-10 rounded-xl shadow-md text-center w-[400px]">

        {loading ? (
          <>
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-lg font-semibold">
              Finalizing Payment...
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we confirm your order.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">
              Redirecting...
            </h2>
          </>
        )}

      </div>

    </div>
  );
}