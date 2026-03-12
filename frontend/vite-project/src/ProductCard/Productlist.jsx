import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductContext";

export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
      {products.map((p) => (
        <ProductCard key={p._id || p.id} product={p} />
      ))}
    </div>
  );
}
