import Image from "next/image";

export default function SaleBanner() {
  return (
    <section className="py-[80px] px-[8%] bg-white">

      <h2 className="text-center text-[32px] mb-[50px] font-semibold">
        Shop by Category
      </h2>

      <div className="grid grid-cols-4 gap-[25px]">

        {/* CARD */}
        {[
          { img: "/images/wedding/wedding1.png", title: "Casual Wear" },
          { img: "/images/wedding/wedding8.png", title: "Party Wear" },
          { img: "/images/wedding/wedding4.png", title: "Office Wear" },
          { img: "/images/wedding/wedding5.png", title: "Wedding Wear" },
        ].map((item, i) => (
          <div
            key={i}
            className="relative h-[450px] bg-white rounded-[20px] pt-[40px] overflow-visible shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-pointer transition duration-300"
          >
            {/* IMAGE */}
            <div className="relative w-full h-[120%] -translate-y-[50px] transition duration-300">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            {/* TITLE */}
            <span className="absolute bottom-[25px] left-[25px] text-white text-[20px] font-semibold">
              {item.title}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}