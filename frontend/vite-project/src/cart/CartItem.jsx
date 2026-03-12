import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const realId = item._id || item.id;
  const price = Number(item.price); // string guard

  const handleDecrease = () => {
    if (item.qty <= 1) {
      // qty 1 se kam nahi — remove karo
      removeFromCart(realId);
    } else {
      updateQty(realId, item.qty - 1);
    }
  };

  const handleIncrease = () => {
    updateQty(realId, item.qty + 1);
  };

  return (
    <div className="flex gap-4 border-b py-4">

      {/* IMAGE */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <img
          src={item.images?.[0]?.url || item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between">

        {/* Name + price */}
        <div>
          <p className="font-semibold text-lg">{item.name}</p>
          <p className="text-green-600 font-bold">
            ₹{price.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {item.description || item.shortDescription || ""}
          </p>
        </div>

        {/* Qty controls + total + remove */}
        <div className="flex items-center justify-between mt-3">

          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 font-bold text-gray-700"
            >
              −
            </button>

            <span className="font-semibold w-6 text-center">{item.qty}</span>

            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 font-bold text-gray-700"
            >
              +
            </button>
          </div>

          {/* Subtotal + Remove */}
          <div className="text-right">
            <p className="font-bold">
              ₹{(price * item.qty).toLocaleString("en-IN")}
            </p>
            <button
              onClick={() => removeFromCart(realId)}
              className="text-red-500 text-sm hover:underline mt-1"
            >
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}