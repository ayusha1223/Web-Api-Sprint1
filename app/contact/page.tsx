export default function ContactPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Contact Us</h1>

        <p>Email: support@naayuattire.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: Kathmandu, Nepal</p>

        <form style={{ marginTop: 24 }}>
          <input type="text" placeholder="Your Name" />
          <br /><br />
          <input type="email" placeholder="Your Email" />
          <br /><br />
          <textarea placeholder="Your Message" />
          <br /><br />
          <button>Send Message</button>
        </form>
      </div>
    </div>
  );
}
