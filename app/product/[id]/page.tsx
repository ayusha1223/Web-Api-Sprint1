"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { products } from "../../data/products";

export default function ProductDetailsPage() {
  // 1️⃣ get params
  const params = useParams();
  const id = params.id as string;

  // 2️⃣ FIXED: convert id to number
  const product = products.find((p) => p.id === Number(id));

  // 3️⃣ handle missing product
  if (!product) {
    return <p>Product not found</p>;
  }

  // 4️⃣ render page
  return (
    <div className="productDetails">
      <div className="productImage">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={500}
        />
      </div>

      <div className="productInfo">
        <h1>{product.title}</h1>
        <p className="category">{product.category}</p>
        <p className="rating">⭐ {product.rating}</p>

        <div className="priceRow">
          <span className="price">₹{product.price}</span>
          <span className="oldPrice">₹{product.oldPrice}</span>
        </div>

        <button className="addToCartBtn">Add to Cart</button>
      </div>
    </div>
  );
}
