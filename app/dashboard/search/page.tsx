// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query");
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     if (!query) return;

//     fetch(`http://localhost:5050/api/products?search=${query}`)
//       .then(res => res.json())
//       .then(data => setProducts(data.data || []));
//   }, [query]);

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-6">
//         Search Results for "{query}"
//       </h1>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="grid grid-cols-4 gap-6">
//           {products.map((product: any) => (
//             <div
//               key={product._id}
//               className="border p-4 rounded-lg shadow-sm"
//             >
//               <img
//                 src={`http://localhost:5050${product.images[0]}`}
//                 className="h-40 w-full object-cover rounded-md"
//               />
//               <h2 className="font-semibold mt-2">{product.name}</h2>
//               <p className="text-pink-500 font-bold">
//                 Rs. {product.price}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }