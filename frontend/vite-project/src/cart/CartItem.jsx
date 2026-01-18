import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
 const realId = item._id || item.id;
  return (
    <div className="flex gap-4 border-b py-4">

      {/* LEFT — IMAGE */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <img
          src={item.images?.[0]?.url || item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* RIGHT — CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        {/* Name + price */}
        <div>
          <p className="font-semibold text-lg">{item.name}</p>

          <p className="text-green-600 font-bold">
            ₹{item.price}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {item.shortDescription || "Product overview here"}
          </p>
        </div>

        {/* Qty + Total + Remove */}
        <div className="flex items-center justify-between mt-3">

          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(realId, item.qty - 1)}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100"
            >
              -
            </button>

            <span className="font-semibold">{item.qty}</span>

            <button
              onClick={() => updateQty(realId, item.qty + 1)}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Total + Remove */}
          <div className="text-right">
            <p className="font-bold">
              ₹{item.price * item.qty}
            </p>

            <button
              onClick={() => removeFromCart(realId)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
