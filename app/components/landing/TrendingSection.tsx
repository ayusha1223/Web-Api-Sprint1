import Image from "next/image";

export default function TrendingSection() {
  return (
    <section className="trending">
      <h2>Trending This Season</h2>

      <div className="trending-grid">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="trend-card">
            <Image
              src={`/images/kurtha${item}.jpg`}
              alt="Trending Kurtha"
              width={250}
              height={350}
            />
            <p>Premium Kurtha</p>
          </div>
        ))}
      </div>
    </section>
  );
}
