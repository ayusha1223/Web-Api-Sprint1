import Image from "next/image";

type ProductCardProps = {
  image: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  discount: string;

  // 👇 ADD THESE
  isFav: boolean;
  onToggleFav: () => void;
  onAddToCart: () => void;
  onOpenDetails: () => void;
};

export default function ProductCard({
  image,
  title,
  category,
  price,
  oldPrice,
  rating,
  discount,
  isFav,
  onToggleFav,
  onAddToCart,
  onOpenDetails,
}: ProductCardProps) {
  return (
    <div className="productCard">
      <div className="imageWrapper" onClick={onOpenDetails}>
        <span className="discountBadge">{discount}</span>
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="productImage"
        />
      </div>

      <div className="cardContent">
        <p className="category">{category}</p>
        <h3 className="title">{title}</h3>

        <div className="rating">⭐ {rating}</div>

        <div className="priceRow">
          <span className="price">₹{price}</span>
          <span className="oldPrice">₹{oldPrice}</span>
        </div>

        <div className="cardActions">
          <button onClick={onToggleFav}>
            {isFav ? "❤️" : "♡"}
          </button>

          <button onClick={onAddToCart}>🛒</button>
        </div>
      </div>
    </div>
  );
}