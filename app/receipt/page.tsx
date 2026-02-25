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
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center p-6 overflow-y-auto">
    
    {/* INVOICE CARD */}
    <div
      ref={receiptRef}
      className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-5 relative"
    >

      {/* TOP ACCENT BAR */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-t-3xl"></div>

     {/* HEADER */}
<div className="flex justify-between items-start mb-10 relative">

  <div>
    <h1 className="text-3xl font-bold tracking-widest text-gray-800">
      NAAYU ATTIRE
    </h1>
    <p className="text-gray-500 mt-1">
      Premium Ethnic Wear
    </p>
  </div>

  <div className="text-right text-sm text-gray-600">
    <p><strong>Invoice #</strong> {order._id}</p>
    <p><strong>Date</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
  </div>

  {/* DOWNLOAD BUTTON TOP RIGHT */}
  <button
    onClick={downloadPDF}
    className="absolute -top-4 right-0 bg-black text-white px-5 py-2 rounded-xl text-sm shadow-md hover:bg-gray-900 transition"
  >
    Download PDF
  </button>

</div>

      {/* CUSTOMER + PAYMENT */}
      <div className="grid grid-cols-2 gap-10 mb-10">

        <div>
          <h3 className="font-semibold text-gray-700 mb-3 uppercase text-sm tracking-wide">
            Billing To
          </h3>
          <p className="font-medium">{order.address?.name}</p>
          <p className="text-gray-600">{order.address?.address}</p>
          <p className="text-gray-600">{order.address?.city}</p>
          <p className="text-gray-600">{order.address?.phone}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3 uppercase text-sm tracking-wide">
            Payment Info
          </h3>
          <p>Method: <span className="font-medium">{order.paymentMethod}</span></p>
          <p>Status: <span className="font-medium">{order.orderStatus}</span></p>
          <p>Total: <span className="font-semibold">₹{order.totalAmount}</span></p>
        </div>

      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden mb-10">

        <div className="grid grid-cols-4 bg-gray-100 font-semibold text-sm p-4">
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
            <span>Product</span>
            <span>{item.qty}</span>
            <span>₹{item.price}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

      </div>

      {/* TOTAL */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.totalAmount - 119}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹99</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>₹20</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Grand Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        Thank you for shopping with Naayu Attire 💖
      </div>

    </div>
  </div>
);
}