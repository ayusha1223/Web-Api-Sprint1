export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h3>KurthaBuy</h3>
          <p>Elegant kurthas crafted for every occasion.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li>Men Kurtha</li>
            <li>Women Kurtha</li>
            <li>Festive Wear</li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} KurthaBuy. All rights reserved.
      </div>
    </footer>
  );
}
