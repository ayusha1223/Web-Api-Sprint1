"use client";

import { useState } from "react";
import Image from "next/image";

const dresses = [
  { src: "/images/dresses/dress-8.png", top: 118, width: 250, offsetX: 10 },
  { src: "/images/dresses/dress-15.png", top: -10, width: 330 },
  { src: "/images/dresses/dress-10.png", top: 30, width: 255, offsetX: -8 },
  { src: "/images/dresses/dress-11.png", top: 118, width: 225, offsetX: -3 },
  { src: "/images/dresses/dress-12.png", top: 116, width: 230, offsetX: -4 },
  { src: "/images/dresses/dress-13.png", top: 100, width: 192 },
  { src: "/images/dresses/dress-14.png", top: 116, width: 250, offsetX: -5 },
];

export default function TryOnViewer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const current = dresses[selectedIndex];

  const handleSelectDress = (index: number) => {
    if (index === selectedIndex) return;

    setIsFading(true);

    setTimeout(() => {
      setSelectedIndex(index);
      setIsFading(false);
    }, 200);
  };

  return (
    <div className="flex h-full">

      {/* ================= LEFT THUMBNAILS ================= */}
      <div className="flex flex-col gap-4 pr-6 overflow-y-auto">
        {dresses.map((dress, index) => (
          <div
            key={index}
            onClick={() => handleSelectDress(index)}
            className={`cursor-pointer p-2 border rounded-lg transition 
              ${selectedIndex === index
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 hover:border-pink-400"
              }`}
          >
            <Image
              src={dress.src}
              alt={`Dress ${index + 1}`}
              width={80}
              height={120}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {/* ================= MODEL SECTION ================= */}
      <div className="flex-1 flex flex-col items-center justify-center">

        <div
          className="relative"
          style={{
            width: 300,
            height: 520,
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
            className={`absolute transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            style={{
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
              key={selectedIndex}
              src={current.src}
              alt="Dress"
              width={current.width}
              height={500}
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>
        </div>

        {/* TEXT BELOW */}
        <p className="mt-6 text-sm text-gray-600">
          Dress {selectedIndex + 1} of {dresses.length}
        </p>
      </div>
    </div>
  );
}