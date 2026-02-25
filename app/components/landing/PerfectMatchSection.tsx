import Link from "next/link";
import { useRouter } from "next/navigation";
const PerfectMatchSection = () => {
  const router = useRouter();
  return (
    <section className="w-full">

      {/* ===== TOP FEATURE STRIP ===== */}
      <div className="flex justify-center gap-[80px] py-[40px] px-[10%] bg-[#f4f4f4]">

        {/* ITEM 1 */}
        <div className="flex items-center gap-[15px]">
          <div className="w-[50px] h-[50px] rounded-full bg-[#eaeaea] flex items-center justify-center text-[20px]">
            💵
          </div>
          <div>
            <h4 className="text-[16px] font-medium">Cash On Delivery</h4>
            <p className="text-[14px] text-[#777] mt-[3px]">
              Pay after you get it
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex items-center gap-[15px]">
          <div className="w-[50px] h-[50px] rounded-full bg-[#eaeaea] flex items-center justify-center text-[20px]">
            🔒
          </div>
          <div>
            <h4 className="text-[16px] font-medium">100% Privacy</h4>
            <p className="text-[14px] text-[#777] mt-[3px]">
              Your Privacy Is Concerned
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex items-center gap-[15px]">
          <div className="w-[50px] h-[50px] rounded-full bg-[#eaeaea] flex items-center justify-center text-[20px]">
            🔁
          </div>
          <div>
            <h4 className="text-[16px] font-medium">Free Replacement</h4>
            <p className="text-[14px] text-[#777] mt-[3px]">
              All orders are freely replaced
            </p>
          </div>
        </div>

      </div>

      {/* ===== PINK SECTION ===== */}
      <div className="bg-[#f6dfe6] py-[80px] px-[10%]">

        <div className="flex justify-between items-center gap-[40px]">

          {/* TEXT */}
          <div className="max-w-[600px]">
            <h2 className="text-[36px] text-[#e63c75] mb-[20px] font-semibold">
              Find Your Perfect Match
            </h2>

            <p className="text-[#555] leading-[1.6]">
              Unlock your beauty potential with our free consultations.
              Our expert team will help you discover the perfect style
              tailored just for you. Say goodbye to confusion and embrace
              a personalized fashion journey.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-[15px]">

            <a
  href="tel:+9779823505204"
  className="bg-[#e63c75] text-white px-[25px] py-[12px] rounded-[6px] cursor-pointer inline-block hover:bg-[#d52e67] transition"
>
  Have Enquiries? Call Us
</a>

            <Link
  href="/contact"
  className="bg-transparent text-[#e63c75] px-[25px] py-[12px] rounded-[6px] border border-[#e63c75] cursor-pointer hover:bg-[#e63c75] hover:text-white transition"
>
  Email Your Queries
</Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PerfectMatchSection;