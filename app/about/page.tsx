"use client";

import Image from "next/image";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f8f5f2] text-gray-800">

        {/* HERO */}
        <section className="relative text-center pt-32 pb-24 px-6 bg-gradient-to-b from-[#efe6ec] to-[#f8f5f2]">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            About <span className="text-pink-600">Naayu Attire</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Where tradition meets modern elegance. Premium pieces crafted for
            confidence, comfort, and timeless sophistication.
          </p>

          {/* IMAGE STRIP */}
          <div className="flex justify-center gap-6 mt-16 flex-wrap">
            {["about1", "about2", "about3", "about4"].map((img) => (
              <div
                key={img}
                className="overflow-hidden rounded-2xl shadow-lg hover:-translate-y-3 transition duration-500"
              >
                <Image
                  src={`/images/about/${img}.jpg`}
                  alt=""
                  width={220}
                  height={150}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">
              Crafted with Passion & Precision
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              Naayu Attire was built from a deep love for heritage fashion and
              refined craftsmanship. Every piece is thoughtfully designed with
              premium fabrics and modern tailoring techniques.
            </p>

            <p className="text-gray-600 leading-8">
              From everyday elegance to statement collections, our focus remains
              on quality, comfort, and empowering individuality.
            </p>
          </div>
        </section>

        {/* SPLIT SECTION */}
        <section className="max-w-6xl mx-auto px-6 pb-28 grid md:grid-cols-2 gap-20 items-center">
          
          {/* IMAGE */}
          <div className="relative">
            <Image
              src="/images/about/about5.jpg"
              alt=""
              width={550}
              height={380}
              className="rounded-3xl shadow-2xl"
            />

            {/* FLOATING CARD */}
            <div className="absolute -bottom-8 left-10 bg-white p-6 rounded-xl shadow-xl text-sm">
              <p className="italic">“Making an impact through fashion.”</p>
              <span className="block mt-2 font-medium text-gray-500">
                – Founder
              </span>
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Empowering Women Through Style
            </h2>

            <p className="text-gray-600 leading-8 mb-4">
              Every design represents culture, creativity, and individuality.
              Our collections celebrate confidence and modern femininity.
            </p>

            <p className="text-gray-600 leading-8">
              We believe fashion should uplift, inspire, and reflect identity
              with grace.
            </p>
          </div>
        </section>

        {/* GROWTH SECTION */}
        <section className="text-center py-28 bg-white">
          <h2 className="text-4xl font-extrabold mb-6">
            Designed to Elevate Every Moment
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 leading-8">
            Every outfit is crafted to enhance everyday style and make
            unforgettable occasions even more special.
          </p>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-10">

          {[
            {
              icon: "👩‍💼",
              title: "Professional Team",
              desc: "Experienced designers and master tailors."
            },
            {
              icon: "🎯",
              title: "Target Oriented",
              desc: "Focused on modern ethnic innovation."
            },
            {
              icon: "⭐",
              title: "Quality Guarantee",
              desc: "Premium craftsmanship assured."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition duration-500 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-pink-100 text-3xl">
                {feature.icon}
              </div>

              <h4 className="text-xl font-bold mb-3">
                {feature.title}
              </h4>

              <p className="text-gray-600 leading-7">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>

      </main>

      <Footer />
    </>
  );
}