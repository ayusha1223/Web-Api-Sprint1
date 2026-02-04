import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";

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

            {/* ✅ PROFILE ICON → PROFILE PAGE */}
            <Link href="/user/profile" className="icon">
              👤
            </Link>
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

            {/* ===== PROMO ROW ===== */}
            <div className="promo-row">

              <div className="banner banner-extended">
                <div className="banner-text">
                  <h1>BIG SALE!</h1>
                  <p>Trending fashion collections</p>
                  <button>Shop Now</button>
                </div>
                <div className="banner-image">
                  <Image
                    src="/images/banner.png"
                    alt="Sale model"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="banner-img"
                    priority
                  />
                </div>
              </div>

              <div className="deal-card">
                <div className="deal-text">
                  <h4>Great Value Deals</h4>
                  <p>Find items on sale<br />With 50–75%</p>
                  <span className="deal-badge">75% off</span>
                </div>
                <div className="deal-image">
                  <Image
                    src="/images/deal.png"
                    alt="Deal product"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="deal-img"
                  />
                </div>
              </div>

              <div className="promo-box promo-discount">
                <h4>Get up to <span>20%</span></h4>
                <p>OFF Dresses</p>
              </div>

              <div className="promo-box promo-new">
                <h4>New Arrivals</h4>
                <button>Shop now</button>
              </div>
            </div>

            {/* ===== CHOOSE BY COLOR SECTION ===== */}
            <section className="chooseByColorSection">
              <h2 className="chooseTitle">Choose by color</h2>

              <div className="kurthaCircleSection">
                {[
                  { img: "peach.png", label: "Peach" },
                  { img: "maroon.png", label: "Maroon" },
                  { img: "mustard.png", label: "Mustard" },
                  { img: "green.png", label: "Green" },
                  { img: "beige.png", label: "Beige" },
                  { img: "black.png", label: "Black" },
                ].map((item) => (
                  <div className="kurthaCircle" key={item.label}>
                    <div className="circle">
                      <div className="circleImageWrapper">
                        <img
                          src={`/images/${item.img}`}
                          alt={`${item.label} Kurtha`}
                        />
                      </div>
                    </div>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

          <section className="splitHero">
  <div className="splitHeroLeft">
    <img src="/images/hero-left.jpg" alt="Left" />
  </div>

  <div className="splitHeroRight">
    <img src="/images/hero-right.jpg" alt="Right" />
  </div>

  {/* OVERLAY — MUST BE INSIDE splitHero */}
  <div className="heroText">
    <h1>
      MOVE.<br />
      REST.<br />
      RECOVER.
    </h1>
    <p>Discover the drop</p>
    <button>Shop Now</button>
  </div>
</section>

            {/* ===== TITLE ===== */}
            <div className="pickTitleWrapper">
              <h2 className="pickTitle">Pick yours now</h2>
            </div>

            {/* ===== PRODUCT LIST GRID ===== */}
            <section className="productListSection">
              <div className="productGrid">
                {[
                  "kurtha9.jpg",
                  "kurtha10.jpg",
                  "kurtha11.jpg",
                  "kurtha12.jpg",
                  "kurtha13.png",
                  "kurtha14.png",
                  "kurtha15.png",
                  "kurtha16.png",
                  "kurtha17.png",
                ].map((img, i) => (
                  <div className="productCard" key={i}>
                    <span className="wishlist">♡</span>

                    <div className="productImg">
                      <img src={`/images/${img}`} alt="Product" />
                    </div>

                    <div className="productInfo">
                      <p className="brand">ADIDAS</p>
                      <p className="name">Puaro Ms Running Shoes</p>

                      <div className="priceRow">
                        <span className="price">₹1,499</span>
                        <span className="off">70% off</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
