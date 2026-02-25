export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-widest mb-4">
            NAAYU ATTIRE
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Elegant fashion crafted for every occasion.
            Discover timeless styles designed with
            premium quality and modern aesthetics.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              Casual Collection
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Festive Wear
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Luxury Line
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Sale
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              About Us
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Join Our Newsletter
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Get exclusive offers and fashion updates.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black text-sm focus:outline-none"
            />
            <button className="bg-pink-600 hover:bg-pink-500 transition px-4 py-2 rounded-r-md text-white text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} NAAYU ATTIRE. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              Instagram
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Facebook
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Twitter
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}