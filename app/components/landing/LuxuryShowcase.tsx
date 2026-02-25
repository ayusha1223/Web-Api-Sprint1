import Image from "next/image";

export default function LuxuryShowcase() {
  return (
    <section className="bg-[#eae8e5] py-[80px] px-[8%]">

      {/* ===== TOP 3 IMAGES ===== */}
      <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-[40px] mb-[60px]">

        {/* LEFT */}
        <div className="relative h-[560px] flex items-center justify-center bg-[#1f3d2b]">
          <div className="relative w-[85%] h-[90%]">
            <Image
              src="/images/landing/landing5.png"
              alt="Left"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="relative h-[150%] flex items-center justify-center bg-[#7c1f2b] overflow-visible">
          <div className="relative w-[85%] h-[90%] -translate-y-[70px]">
            <Image
              src="/images/landing/landing6.png"
              alt="Center"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative h-[560px] flex items-center justify-center bg-[#1f3d2b]">
          <div className="relative w-[85%] h-[90%]">
            <Image
              src="/images/landing/landing7.png"
              alt="Right"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </div>

      {/* ===== DIVIDER ===== */}
      <div className="h-[1px] bg-[#cac6c1] my-[60px]" />

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-[50px]">
        <h3 className="text-[16px] tracking-[3px] text-[#6b4f2c] font-semibold">
          FEATURED COLLECTIONS
        </h3>

        <span className="text-[14px] text-[#6b4f2c]">
          New Arrivals
        </span>
      </div>

      {/* ===== PRODUCT GRID ===== */}
      <div className="grid grid-cols-4 gap-[40px]">

        {[
          { img: "/images/landing/landing1.png", title: "Handwoven Silk" },
          { img: "/images/landing/landing2.png", title: "Maroon Designer Drape" },
          { img: "/images/landing/landing3.png", title: "Red Heritage Classic" },
          { img: "/images/landing/landing4.png", title: "Golden Festive Edit" },
        ].map((item, i) => (
          <div
            key={i}
            className="relative h-[520px] flex items-end justify-center bg-white rounded-[6px] overflow-hidden"
          >
            <div className="relative w-[90%] h-full">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            {/* OVERLAY */}
            <div className="absolute bottom-[20px] w-[80%] bg-black/55 py-[12px] text-center rounded-[4px]">
              <span className="text-white text-[14px] tracking-[1px]">
                {item.title}
              </span>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}