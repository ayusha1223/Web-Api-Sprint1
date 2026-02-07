"use client";

import { useState } from "react";
import Image from "next/image";

const dresses = [
  "/images/dresses/dress-8.png",
  "/images/dresses/dress-10.png",
  "/images/dresses/dress-11.png",
  "/images/dresses/dress-12.png",
  "/images/dresses/dress-13.png",
  "/images/dresses/dress-14.png",
  "/images/dresses/dress-15.png",
];

export default function TryOnViewer() {
  const [index, setIndex] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          width: 300,
          height: 520,
          margin: "auto",
        }}
      >
        {/* BODY */}
        <Image
          src="/images/body1.png"
          alt="Body"
          fill
          style={{ objectFit: "contain", zIndex: 1 }}
        />

        {/* DRESS */}
        <Image
          src={dresses[index]}
          alt="Dress"
          fill
          style={{ objectFit: "contain", zIndex: 2 }}
        />

        {/* LEFT */}
        <button
          onClick={() =>
            setIndex((prev) => (prev - 1 + dresses.length) % dresses.length)
          }
          className="tryonArrow left"
        >
          ◀
        </button>

        {/* RIGHT */}
        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % dresses.length)
          }
          className="tryonArrow right"
        >
          ▶
        </button>
      </div>

      <p style={{ marginTop: 10 }}>
        Dress {index + 1} / {dresses.length}
      </p>
    </div>
  );
}