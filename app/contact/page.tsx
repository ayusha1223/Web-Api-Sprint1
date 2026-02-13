"use client";

import "./contact.css";

export default function ContactPage() {
  return (
    <div className="contactPage">

      {/* HERO SECTION */}
      <section className="contactHero">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out for orders, collaborations,
          or any inquiries about Naayu Attire.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="contactContainer">

        {/* LEFT SIDE */}
        <div className="contactLeft">

          <div className="infoGrid">
            <div className="infoCard">
              <span>📞</span>
              <h4>Phone</h4>
              <p>+977 9800000000</p>
            </div>

            <div className="infoCard">
              <span>💬</span>
              <h4>WhatsApp</h4>
              <p>+977 9800000000</p>
            </div>

            <div className="infoCard">
              <span>✉️</span>
              <h4>Email</h4>
              <p>support@naayuattire.com</p>
            </div>

            <div className="infoCard">
              <span>🏬</span>
              <h4>Our Shop</h4>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          <div className="mapBox">
            <iframe
              src="https://www.google.com/maps?q=Kathmandu&output=embed"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: 12 }}
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="contactForm">
          <h2>Get In Touch</h2>
          <p>
            Fill out the form below and our team will respond shortly.
          </p>

          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message" rows={4}></textarea>
            <button type="submit">Send Now</button>
          </form>
        </div>

      </section>

    </div>
  );
}
