"use client";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f8f5f2] text-gray-800">

        {/* HERO */}
        <section className="text-center pt-32 pb-20 px-6 bg-gradient-to-b from-[#eaf3e6] to-[#f8f5f2]">
          <h1 className="text-5xl font-extrabold mb-6">
            Contact <span className="text-pink-600">Naayu Attire</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-600 text-lg leading-relaxed">
            We'd love to hear from you. Reach out for orders,
            collaborations, or any inquiries.
          </p>
        </section>

        {/* MAIN SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                <div className="text-2xl mb-3">📞</div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600 text-sm mt-2">
                  +977 9823505204
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-semibold">WhatsApp</h4>
                <p className="text-gray-600 text-sm mt-2">
                  +977 9823505204
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                <div className="text-2xl mb-3">✉️</div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600 text-sm mt-2">
                  naayuattire@gmail.com
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                <div className="text-2xl mb-3">📍</div>
                <h4 className="font-semibold">Our Location</h4>
                <p className="text-gray-600 text-sm mt-2">
                  Kapan, Kathmandu
                </p>
              </div>
            </div>

            {/* MAP */}
            <div className="mt-10 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Rajbhandari%20Jewellers%20Kapan%20Kathmandu&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-3">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and our team will respond shortly.
            </p>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <textarea
                rows={5}
                placeholder="Message"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-full font-semibold transition"
              >
                Send Now
              </button>

            </form>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}