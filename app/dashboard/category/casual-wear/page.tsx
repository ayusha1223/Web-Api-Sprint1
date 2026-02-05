
import ProductCard from "../../../components/ProductCard";
import "../category.css";

const products = Array.from({ length: 24 }, (_, i) => ({
  image: `/images/kurtha${(i % 6) + 1}.jpg`,
  title: `Printed Casual Kurti ${i + 1}`,
  category: "Casual Wear",
  price: 35,
  oldPrice: 50,
  rating: 4.8,
  discount: "50% off",
}));

export default function CasualWearPage() {
  return (
    <div>
      <h1 className="pageTitle">Casual Wear</h1>

      <div className="productGrid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            oldPrice={product.oldPrice}
            rating={product.rating}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
}
