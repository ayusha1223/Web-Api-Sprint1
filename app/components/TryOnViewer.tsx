"use client";

import { useState } from "react";
import Image from "next/image";

const dresses = [
  { src: "/images/dresses/dress-8.png", top: 123, width: 260, offsetX: 10 },
  { src: "/images/dresses/dress-15.png", top: -10, width: 350 },
  { src: "/images/dresses/dress-10.png", top: 30, width: 265, offsetX: -8 },
  { src: "/images/dresses/dress-11.png", top: 122, width: 245, offsetX: -3 },
  { src: "/images/dresses/dress-12.png", top: 123, width: 245, offsetX: -5 },
  { src: "/images/dresses/dress-13.png", top: 100, width: 200 },
  { src: "/images/dresses/dress-14.png", top: 116, width: 290, offsetX: -5 },
];

export default function TryOnViewer() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const current = dresses[index];

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
        <div
          className={`tryonDress ${isFading ? "fade" : ""}`}
          style={{
            position: "absolute",
            top: current.top,
            left: "50%",
            transform: `translateX(calc(-50% + ${
              current.offsetX || 0
            }px))`,
            width: current.width,
            zIndex: 2,
          }}
        >
          <Image
            key={index}
            src={current.src}
            alt="Dress"
            width={current.width}
            height={500}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </div>

        {/* LEFT */}
        <button
          className="tryonArrow left"
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              setIndex((prev) => (prev - 1 + dresses.length) % dresses.length);
              setIsFading(false);
            }, 200);
          }}
        >
          ◀
        </button>

        {/* RIGHT */}
        <button
          className="tryonArrow right"
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              setIndex((prev) => (prev + 1) % dresses.length);
              setIsFading(false);
            }, 200);
          }}
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
