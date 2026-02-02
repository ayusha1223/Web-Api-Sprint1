import Image from "next/image";

const categories = [
  { title: "Men Kurtha", image: "/images/kurtha1.jpg" },
  { title: "Women Kurtha", image: "/images/kurtha2.jpg" },
  { title: "Festive Wear", image: "/images/kurtha3.jpg" },
];

export default function CategorySection() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="category-card">
            <Image src={cat.image} alt={cat.title} width={300} height={400} />
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
