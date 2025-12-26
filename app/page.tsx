import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">

        {/* LEFT SIDE */}
        <div className="home-left">
          <h1>Welcome to Naayu Attires</h1>
          <p className="home-quote">
            Grace stitched into every kurthas
          </p>

          <Link href="/login">
            <button className="home-btn">Start Now</button>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="home-right">
          <img
            src="/images/login.png"
            alt="Hero Image"
            className="home-image"
          />
        </div>

      </div>
    </div>
  );
}
