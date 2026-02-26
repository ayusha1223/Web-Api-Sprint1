import CategoryLayout from "../../../components/CategoryLayout";

async function getProducts(category: string) {
  try {
    const res = await fetch(
      `http://localhost:5050/api/products/category/${category}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts(params.category);

const formattedProducts = products.map((p: any) => ({
  id: p._id,
  title: p.name,
  price: p.price,
  image: p.images?.[0]
    ? `http://localhost:5050${p.images[0]}`
    : "/placeholder.png",
  slug: p._id,
}));

  return (
    <CategoryLayout
      title={params.category.toUpperCase()}
      products={formattedProducts}
    />
  );
}