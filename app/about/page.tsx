"use client";

import Image from "next/image";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="aboutPage">

      {/* HERO */}
      <section className="heroSection">
        <h1>About Us</h1>
        <p>
          Where tradition meets modern elegance. Premium kurthas crafted for
          confidence, comfort, and timeless style.
        </p>

        <div className="heroImages">
          <Image src="/images/about/about1.jpg" alt="" width={180} height={120} />
          <Image src="/images/about/about2.jpg" alt="" width={180} height={120} />
          <Image src="/images/about/about3.jpg" alt="" width={180} height={120} />
          <Image src="/images/about/about4.jpg" alt="" width={180} height={120} />
        </div>
      </section>


      {/* SECTION 1 */}
      <section className="contentSection">
        <div className="textBlock">
          <h2>We make sure your idea & creation delivered properly</h2>
          <p>
            Naayu Attire is built with a deep passion for ethnic fashion and timeless craftsmanship. Every kurtha is thoughtfully designed with meticulous attention to detail, premium-quality fabrics, and refined modern tailoring. We blend traditional artistry with contemporary silhouettes to create pieces that are both graceful and empowering.
          </p>
          <p>
            From everyday essentials to statement wedding collections, we prioritize comfort, elegance, and lasting quality in every design. Each piece is crafted to feel as beautiful as it looks, ensuring confidence for every occasion.
          </p>
        </div>
      </section>


      {/* SECTION 2 */}
      <section className="splitSection">
        <div className="imageCard">
          <Image
            src="/images/about/about5.jpg"
            alt=""
            width={450}
            height={320}
          />
          <div className="quoteCard">
            <p>“Making an impact through fashion.”</p>
            <span>– Naayu Founder</span>
          </div>
        </div>

        <div className="textBlock">
          <h2>We empower small business owners</h2>
          <p>
            Every design represents creativity and culture. We empower
            individuality through vibrant colors and elegant craftsmanship.
          </p>
          <p>
            Our goal is to help women feel confident, stylish, and proud
            of their identity.
          </p>
        </div>
      </section>


      {/* GROWTH */}
      <section className="growthSection">
        <h2>We help women grow faster and bigger</h2>
        <p>
          Every outfit is designed to elevate your everyday fashion
          and make special moments unforgettable.
        </p>
      </section>


      {/* FEATURES */}
      <section className="features">
        <div className="featureItem">
          <div className="circle">👩‍💼</div>
          <h4>Professional Team</h4>
          <p>Experienced designers and tailors.</p>
        </div>

        <div className="featureItem">
          <div className="circle">🎯</div>
          <h4>Target Oriented</h4>
          <p>Focused on modern ethnic trends.</p>
        </div>

        <div className="featureItem">
          <div className="circle">⭐</div>
          <h4>Success Guarantee</h4>
          <p>Quality and satisfaction assured.</p>
        </div>
      </section>

    </div>
  );
}
