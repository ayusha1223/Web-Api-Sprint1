import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* LEFT: LOGO */}
      <div className="nav-logo">
        <Link href="/">
          <Image
            src="/images/logo1.png"
            alt="KurthaBuy Logo"
            width={140}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* CENTER: NAV LINKS */}
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
        <li className="sale-link"><Link href="/sale">Sale</Link></li>
      </ul>

      {/* RIGHT: ACTION BUTTONS */}
      <div className="nav-actions">
        <Link href="/login" className="login-btn">Login</Link>
        <Link href="/cart" className="cart-btn">Cart</Link>
      </div>
    </nav>
  );
}
