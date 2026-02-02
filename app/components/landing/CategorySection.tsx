import Image from "next/image";
import Link from "next/link";

const categories = [
  { title: "Casual Wear", image: "/images/kurtha1.jpg", slug: "men-kurtha" },
  { title: "Co-ord Set", image: "/images/kurtha2.jpg", slug: "women-kurtha" },
  { title: "Festive Wear", image: "/images/kurtha3.jpg", slug: "festive-wear" },
  { title: "Wedding Wear", image: "/images/kurtha4.jpg", slug: "wedding-wear" },
  { title: "Winter Wear", image: "/images/kurtha5.jpg", slug: "casual-wear" },
  { title: "1 piece wear", image: "/images/kurtha6.jpg", slug: "party-wear" },
  { title: "2 piece", image: "/images/kurtha7.jpg", slug: "party-wear" },
];

export default function CategorySection() {
  return (
    <section className="categories">
      <h2 className="category-title">Category</h2>

      {/* Slider */}
      <div className="category-slider">
        {categories.map((cat) => (
          <Link
            href={`/category/${cat.slug}`}
            key={cat.title}
            className="category-card"
          >
            <div className="category-image">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="category-img"
              />

              {/* Overlay */}
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <span className="explore-btn">Explore</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
