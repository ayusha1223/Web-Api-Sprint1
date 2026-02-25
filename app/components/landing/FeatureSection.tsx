"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthModal from "../auth/AuthModal"; // adjust path


type Mode = "login" | "register" | "forgot-password";

export default function FeatureSection() {
  const router = useRouter();

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Mode>("login");

const openLogin = () => {
  setAuthMode("login");
  setAuthOpen(true);
};

  return (
    <>
      <section className="py-[60px] px-[20px] bg-[#f7f4ef] flex flex-col items-center">

  {/* HEADER */}
  <div className="w-full max-w-[1100px] flex justify-between items-center mb-[40px]">
    
    <div>
      <span className="text-[12px] tracking-[2px] font-semibold text-[#9aa0a6]">
        POPULAR
      </span>

      <h2 className="text-[32px] mt-[5px] font-semibold">
        Our Popular Kurthas
      </h2>
    </div>

    <button
      className="font-semibold text-black"
      onClick={openLogin}
    >
      Explore All →
    </button>

  </div>

  {/* GRID */}
  <div className="flex gap-[30px] justify-center flex-wrap max-w-[1100px] w-full">

    {/* CARD 1 */}
    <div className="bg-white w-[320px] rounded-[12px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-[8px]">
      
      <div className="relative w-full aspect-[4/5]">
        <Image
          src="/images/kurtha1.jpg"
          alt="Kurtha"
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="p-[20px]">
        <h3 className="text-[18px] mb-[6px] font-medium">
          Premium Cotton Kurtha
        </h3>

        <p className="text-[14px] text-[#777] mb-[15px]">
          Handcrafted • Soft Fabric • Elegant Fit
        </p>

        <div className="flex justify-between items-center">
          <button
            className="bg-black text-white px-[16px] py-[8px]"
           onClick={openLogin}
          >
            Shop Now
          </button>

          <span className="font-bold">Rs 1,500</span>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="bg-white w-[320px] rounded-[12px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-[8px]">
      
      <div className="relative w-full aspect-[4/5]">
        <Image
          src="/images/kurtha2.jpg"
          alt="Kurtha"
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="p-[20px]">
        <h3 className="text-[18px] mb-[6px] font-medium">
          Festive Collection Kurtha
        </h3>

        <p className="text-[14px] text-[#777] mb-[15px]">
          Luxury Embroidery • Premium Stitch
        </p>

        <div className="flex justify-between items-center">
          <button
            className="bg-black text-white px-[16px] py-[8px]"
           onClick={openLogin}
          >
            Shop Now
          </button>

          <span className="font-bold">Rs 1,800</span>
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="bg-white w-[320px] rounded-[12px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-[8px]">
      
      <div className="relative w-full aspect-[4/5]">
        <Image
          src="/images/kurtha3.jpg"
          alt="Kurtha"
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="p-[20px]">
        <h3 className="text-[18px] mb-[6px] font-medium">
          Minimal Everyday Kurtha
        </h3>

        <p className="text-[14px] text-[#777] mb-[15px]">
          Comfort Wear • Modern Cut
        </p>

        <div className="flex justify-between items-center">
          <button
            className="bg-black text-white px-[16px] py-[8px]"
            onClick={openLogin}
          >
            Shop Now
          </button>

          <span className="font-bold">Rs 3,200</span>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* AUTH MODAL */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />
    </>
  );
}
