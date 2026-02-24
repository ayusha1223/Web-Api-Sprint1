import "./perfectMatch.css";

const PerfectMatchSection = () => {
  return (
    <section className="perfect-wrapper">

      {/* Top Feature Icons */}
      <div className="feature-strip">
        <div className="feature-item">
          <div className="icon-circle">💵</div>
          <div>
            <h4>Cash On Delivery</h4>
            <p>Pay after you get it</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-circle">🔒</div>
          <div>
            <h4>100% Privacy</h4>
            <p>Your Privacy Is Concerned</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-circle">🔁</div>
          <div>
            <h4>Free Replacement</h4>
            <p>All orders are freely replaced</p>
          </div>
        </div>
      </div>

      {/* Pink Section */}
      <div className="perfect-container">
        <div className="perfect-content">

          <div className="perfect-text">
            <h2>Find Your Perfect Match</h2>
            <p>
              Unlock your beauty potential with our free consultations.
              Our expert team will help you discover the perfect style
              tailored just for you. Say goodbye to confusion and embrace
              a personalized fashion journey.
            </p>
          </div>

          <div className="perfect-buttons">
            <button className="primary-btn">
              Have Enquiries? Call Us
            </button>

            <button className="secondary-btn">
              Email Your Queries
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default PerfectMatchSection;