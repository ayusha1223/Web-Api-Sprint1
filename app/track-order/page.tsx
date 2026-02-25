"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [status] = useState(3);

  const steps = [
    "Order Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

 return (
  <div className="min-h-screen bg-gray-50 py-10 px-6">

    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900">
          Track Your Order
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Order ID: KB2026-4521
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-12">

        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200"></div>

        <div
          className="absolute top-4 left-0 h-[2px] bg-indigo-600 transition-all duration-500"
          style={{
            width: `${((status - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const active = status >= stepNumber;

            return (
              <div key={index} className="flex flex-col items-center w-full">

                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium border ${
                    active
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-400 border-gray-300"
                  }`}
                >
                  {stepNumber}
                </div>

                <span
                  className={`mt-2 text-xs ${
                    active ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>

              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Current Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-2">
              Current Status
            </h2>

            <p className="text-xl font-semibold text-indigo-600">
              {steps[status - 1]}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Your package is currently moving through our delivery network.
            </p>

            <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
              Estimated Delivery: 3 – 5 Business Days
            </div>

            <div className="mt-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-black transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Tracking History */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">
              Tracking History
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-gray-500">
                  Package departed from warehouse
                </p>
              </div>

              <div>
                <p className="font-medium">Packed</p>
                <p className="text-gray-500">
                  Order packed and ready for shipment
                </p>
              </div>

              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-gray-500">
                  Your order was successfully placed
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="text-sm font-semibold mb-2">
              Delivery Address
            </h3>

            <p className="text-sm text-gray-800">
              Ayusha Thapa
            </p>
            <p className="text-xs text-gray-500">
              Kathmandu, Nepal
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="text-sm font-semibold mb-2">
              Courier Details
            </h3>

            <p className="text-sm text-gray-800">
              Express Logistics
            </p>
            <p className="text-xs text-gray-500">
              Tracking Number: EXP20264521
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-sm border">
            <iframe
              title="tracking-map"
              src="https://www.google.com/maps?q=Kathmandu&output=embed"
              className="w-full h-64"
              loading="lazy"
            />
          </div>

        </div>

      </div>

    </div>
  </div>
);
}