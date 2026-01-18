import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const nevigate = useNavigate();

  return (
    <div
      className="border rounded-xl p-4 shadow"
      // onClick={() => navigate(`/productdetail/${product._id || product.id}`)}
    >
      <img
        src={product.images?.[0]?.url}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-green-600 font-semibold mt-1">
        ₹{product.price}
      </p>
      <button
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={() => nevigate(`/productdetail/${product._id || product.id}`)}
              >
                View Product
              </button>
    </div>
  );
}
