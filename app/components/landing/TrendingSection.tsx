import Image from "next/image";
import Link from "next/link";

const trendingProducts = [
  {
    title: "Premium Kurtha",
    image: "/images/kurtha1.jpg",
    slug: "premium-kurtha-1",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha2.jpg",
    slug: "premium-kurtha-2",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha3.jpg",
    slug: "premium-kurtha-3",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha4.jpg",
    slug: "premium-kurtha-4",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha5.jpg",
    slug: "premium-kurtha-5",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha6.jpg",
    slug: "premium-kurtha-6",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha8.jpg",
    slug: "premium-kurtha-8",
  },
];

export default function TrendingSection() {
  return (
    <section className="trending">
      <h2 className="section-title">Trending This Season</h2>

      <div className="trending-slider">
        {trendingProducts.map((item) => (
          <Link
            href={`/product/${item.slug}`}
            key={item.slug}
            className="trending-card"
          >
            <div className="trending-image">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="trending-img"
              />

              {/* Overlay */}
              <div className="trending-overlay">
                <h3>{item.title}</h3>
                <span className="explore-btn">View Product</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
