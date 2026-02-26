"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./receipt.css";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5050/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.data);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const downloadPDF = async () => {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`Naayu-Receipt-${order._id}.pdf`);
  };

  if (loading) return <div className="receiptWrapper">Loading...</div>;
  if (!order) return <div className="receiptWrapper">Order not found</div>;

 return (
  <div className="min-h-screen bg-[#f8f6f3] flex flex-col items-center px-6 py-10">

    {/* TOP ACTION BAR */}
    <div className="w-full max-w-5xl flex justify-end gap-4 mb-6">

      <button
        onClick={() => window.location.href = "/dashboard"}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-sm"
      >
        Continue Shopping
      </button>

      <button
        onClick={downloadPDF}
        className="px-6 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition"
      >
        Download PDF
      </button>

    </div>

    {/* INVOICE CARD */}
    <div
      ref={receiptRef}
      className="bg-white w-full max-w-5xl rounded-3xl shadow-xl p-10 relative"
    >

      {/* TOP ACCENT LINE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-t-3xl"></div>

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-4xl font-serif tracking-[0.3em] text-gray-900">
            NAAYU ATTIRE
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Premium Ethnic Wear
          </p>
        </div>

        <div className="text-right text-sm text-gray-600">
          <p className="mb-1">
            <span className="font-medium">Invoice #</span> {order._id}
          </p>
          <p>
            <span className="font-medium">Date</span>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-b border-gray-200 my-8"></div>

      {/* BILLING + PAYMENT */}
      <div className="grid grid-cols-2 gap-16 mb-12 text-sm">

        <div>
          <h3 className="uppercase tracking-wide text-xs font-semibold text-gray-500 mb-4">
            Billing To
          </h3>
          <p className="font-medium text-gray-900">{order.address?.name}</p>
          <p className="text-gray-600 mt-1">{order.address?.address}</p>
          <p className="text-gray-600">{order.address?.city}</p>
          <p className="text-gray-600">{order.address?.phone}</p>
        </div>

        <div>
          <h3 className="uppercase tracking-wide text-xs font-semibold text-gray-500 mb-4">
            Payment Info
          </h3>
          <p>
            Method: <span className="font-medium">{order.paymentMethod}</span>
          </p>
          <p>
            Status: <span className="font-medium">{order.orderStatus}</span>
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            Total: ₹{order.totalAmount}
          </p>
        </div>

      </div>

      {/* ITEM TABLE */}
      <div className="border rounded-xl overflow-hidden mb-12">

        <div className="grid grid-cols-4 bg-gray-50 uppercase tracking-wide text-xs font-semibold p-4 border-b">
          <span>Item</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Total</span>
        </div>

        {order.items.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-4 p-4 border-t text-sm text-gray-700"
          >
            <span>{item.name || "Product"}</span>
            <span>{item.qty}</span>
            <span>₹{item.price}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

      </div>

      {/* TOTAL SECTION */}
      <div className="flex justify-end">
        <div className="w-72 space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{order.totalAmount - 119}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span>₹99</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span>₹20</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-xl font-semibold text-gray-900">
            <span>Grand Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-16 text-center text-gray-400 text-xs tracking-wide">
        Thank you for shopping with Naayu Attire
      </div>

    </div>
  </div>
);
}