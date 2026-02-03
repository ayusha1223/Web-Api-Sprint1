import "./dashboard.css";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        {/* ===== TOP BAR ===== */}
        <div className="topBar">
          <div className="topSearch">
            <div className="searchWrapper">
              <span className="searchIcon">🔍</span>
              <input
                type="text"
                placeholder="Search for dresses, co-ord sets, party wear..."
                className="searchInput"
              />
              <span className="filterIcon">⚙️</span>
            </div>
          </div>

          <div className="topRight">
            <span className="icon">♡</span>
            <span className="icon">🛒</span>
            <span className="icon">👤</span>
          </div>
        </div>

        {/* ===== MAIN LAYOUT ===== */}
        <div className="dashboard-layout">

          {/* ===== SIDEBAR ===== */}
          <aside className="sidebar">
            <div className="sidebar-logo">
              <Image
                src="/images/logo.png"
                alt="Naayu Attire Logo"
                width={130}
                height={50}
                priority
              />
            </div>

            <h3>Categories</h3>
            <ul>
              <li>Casual Wear</li>
              <li>Co-ord Set</li>
              <li>Party Wear</li>
              <li>Winter Wear</li>
              <li>Wedding Wear</li>
              <li>1 Piece Set</li>
            </ul>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main>
            <div className="banner">
              <h1>BIG SALE!</h1>
              <p>Trending fashion collections</p>
              <button>Shop Now</button>
            </div>

            <div className="explore">
              <h3>Explore popular categories</h3>

              <div className="product-grid">

                {/* PRODUCT 1 (LCP IMAGE) */}
                <div className="product-card">
                  <span className="badge discount">-30%</span>
                  <div className="product-image">
                    <Image
                      src="/images/kurtha9.jpg"
                      alt="Household goods"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      priority
                      loading="eager"
                      className="product-img"
                    />
                  </div>
                  <p></p>
                </div>

                {/* PRODUCT 2 */}
                <div className="product-card">
                  <span className="badge new">New</span>
                  <div className="product-image">
                    <Image
                      src="/images/kurtha10.jpg"
                      alt="Game controllers"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="product-img"
                    />
                  </div>
                  <p></p>
                </div>

                {/* PRODUCT 3 */}
                <div className="product-card">
                  <div className="product-image">
                    <Image
                      src="/images/kurtha11.jpg"
                      alt="Accessories"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="product-img"
                    />
                  </div>
                  <p></p>
                </div>

                {/* PRODUCT 4 */}
                <div className="product-card">
                  <div className="product-image">
                    <Image
                      src="/images/kurtha12.jpg"
                      alt="Furniture"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="product-img"
                    />
                  </div>
                  <p></p>
                </div>

              </div>
            </div>
            {/* ===== CATEGORY SHOWCASE (ADDED) ===== */}
<section className="category-showcase">

  <div className="showcase-grid">

    {/* LEFT BIG CARD */}
    <div className="showcase-card large">
      <div className="showcase-text">
        <span className="item-count">1500+ Items</span>
        <h3>Pakistani Set</h3>
        <ul>
          <li>Blue</li>
          <li>Pink</li>
          <li>Teal</li>
          <li>Red</li>
        </ul>
      </div>

      <div className="showcase-image">
        <Image
          src="/images/kurtha13.png"
          alt="Chairs"
          fill
          className="product-img"
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="showcase-right">

      <div className="showcase-card">
        <div className="showcase-text">
          <span className="item-count">750+ Items</span>
          <h3>Cotton</h3>
          <p>Pink • Grey • Red </p>
        </div>

        <div className="showcase-image">
          <Image
            src="/images/kurtha14.png"
            alt="Sofa"
            fill
            className="product-img"
          />
        </div>
      </div>

      <div className="showcase-card">
        <div className="showcase-text">
          <span className="item-count">450+ Items</span>
          <h3>Silk</h3>
          <p>Pink • Blue • Green</p>
        </div>

        <div className="showcase-image">
          <Image
            src="/images/kurtha15.png"
            alt="Lighting"
            fill
            className="product-img"
          />
        </div>
      </div>

    </div>
  </div>
</section>

          </main>

        </div>
      </div>
    </div>
  );
}
