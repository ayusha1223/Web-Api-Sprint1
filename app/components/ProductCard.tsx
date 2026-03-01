import Image from "next/image";

type ProductCardProps = {
  image: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  rating?: number;
  discount: string;
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
    <div
      data-testid="product-card"
      className="
        bg-white dark:bg-[#1a1a1a]
        text-black dark:text-white
        rounded-xl
        shadow-sm hover:shadow-lg
        transition duration-300
        overflow-hidden
      "
    >
      {/* IMAGE */}
      <div
        data-testid="open-product"
        className="relative cursor-pointer bg-white dark:bg-[#1a1a1a]"
        onClick={onOpenDetails}
      >
        <span
          className="
            absolute top-3 left-3
            bg-pink-500 text-white
            text-xs font-semibold
            px-2 py-1 rounded
          "
        >
          {discount}
        </span>

        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="w-full object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {category}
        </p>

        <h3 className="font-semibold text-sm truncate">
          {title}
        </h3>

        <div className="text-sm text-yellow-500">
          ⭐ {rating}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">
            ₹{price}
          </span>

          <span className="line-through text-gray-400 text-sm">
            ₹{oldPrice}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-2">
          <button
            data-testid="toggle-fav"
            onClick={onToggleFav}
            className="text-lg"
          >
            {isFav ? "❤️" : "🤍"}
          </button>

          <button
            data-testid="add-to-cart"
            onClick={onAddToCart}
            className="
              bg-[#ff3f6c]
              hover:bg-[#ff527b]
              text-white
              text-sm
              px-3 py-1.5
              rounded-md
              transition
            "
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}