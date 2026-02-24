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
    <div className="receiptWrapper">
      <div className="invoiceCard" ref={receiptRef}>

        {/* HEADER */}
        <div className="invoiceHeader">
          <div>
            <h1 className="brand">NAAYU ATTIRE</h1>
            <p className="tagline">Premium Ethnic Wear</p>
          </div>

          <div className="invoiceMeta">
            <p><strong>Invoice #</strong> {order._id}</p>
            <p><strong>Date</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <hr />

        {/* CUSTOMER INFO */}
        <div className="invoiceSection">
          <div>
            <h3>Billing To</h3>
            <p>{order.address?.name}</p>
            <p>{order.address?.address}</p>
            <p>{order.address?.city}</p>
            <p>{order.address?.phone}</p>
          </div>

          <div>
            <h3>Payment Info</h3>
            <p>Method: {order.paymentMethod}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="itemsTable">
          <div className="tableHeader">
            <span>Item</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Total</span>
          </div>

          {order.items.map((item: any, index: number) => (
            <div key={index} className="tableRow">
              <span>Product</span>
              <span>{item.qty}</span>
              <span>₹{item.price}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* TOTAL SECTION */}
        <div className="totalSection">
          <div>
            <p>Subtotal</p>
            <p>Delivery</p>
            <p>Service Fee</p>
            <h3>Grand Total</h3>
          </div>

          <div>
            <p>₹{order.totalAmount - 119}</p>
            <p>₹99</p>
            <p>₹20</p>
            <h3>₹{order.totalAmount}</h3>
          </div>
        </div>

        <div className="footerNote">
          Thank you for shopping with Naayu Attire 💖
        </div>

      </div>

      <button className="downloadBtn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}