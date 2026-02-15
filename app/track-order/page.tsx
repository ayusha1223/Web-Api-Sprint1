"use client";

import { useState } from "react";
import "./track.css";

export default function TrackOrderPage() {
  const [status, setStatus] = useState(3); 
  // 1 = Unpacked
  // 2 = Packed
  // 3 = In Transit
  // 4 = On Your Way
  // 5 = Delivered

  const steps = [
    "Unpacked",
    "Packed",
    "In Transit",
    "On Your Way",
    "Delivered",
  ];

  return (
    <div className="trackWrapper">

      <div className="trackCard">

        <h2>Track Your Order</h2>
        <p className="orderId">Order ID: KB2026-4521</p>

        {/* Timeline */}
        <div className="timeline">

          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = status >= stepNumber;

            return (
              <div key={index} className="timelineItem">

                <div className={`circle ${isActive ? "active" : ""}`}>
                  {stepNumber}
                </div>

                <span className={isActive ? "activeText" : ""}>
                  {step}
                </span>

                {index !== steps.length - 1 && (
                  <div
                    className={`line ${status > stepNumber ? "activeLine" : ""}`}
                  />
                )}

              </div>
            );
          })}

        </div>

        {/* Status Message */}
        <div className="statusBox">
          <h3>Current Status:</h3>
          <p>
            {steps[status - 1]}
          </p>
        </div>

        {/* Map Section */}
        <div className="mapSectionTrack">
          <iframe
            title="tracking-map"
            src="https://www.google.com/maps?q=Kathmandu&output=embed"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}
