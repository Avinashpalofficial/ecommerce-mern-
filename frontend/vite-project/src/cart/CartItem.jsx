import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const realId = item._id || item.id;
  const price = Number(item.price);

  const handleDecrease = () => {
    if (item.qty <= 1) {
      removeFromCart(realId);
    } else {
      updateQty(realId, item.qty - 1);
    }
  };

  const handleIncrease = () => {
    updateQty(realId, item.qty + 1);
  };

  return (
    <div className="flex gap-4 p-6">
      {/* Image */}
      <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-[hsl(45,20%,93%)] rounded-xl overflow-hidden">
        <img
          src={item.images?.[0]?.url || item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-medium text-[hsl(20,15%,10%)] truncate pr-4">
            {item.name}
          </h3>
          <p className="text-[hsl(12,76%,55%)] font-semibold mt-1">
            Rs. {price.toLocaleString("en-IN")}
          </p>
          {(item.description || item.shortDescription) && (
            <p className="text-sm text-[hsl(20,10%,40%)] mt-1 line-clamp-1">
              {item.description || item.shortDescription}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[hsl(20,10%,88%)] hover:bg-[hsl(45,20%,93%)] transition-colors"
            >
              <Minus className="w-4 h-4 text-[hsl(20,10%,40%)]" />
            </button>

            <span className="w-10 text-center font-medium text-[hsl(20,15%,10%)]">
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[hsl(20,10%,88%)] hover:bg-[hsl(45,20%,93%)] transition-colors"
            >
              <Plus className="w-4 h-4 text-[hsl(20,10%,40%)]" />
            </button>
          </div>

          {/* Subtotal & Remove */}
          <div className="flex items-center gap-4">
            <p className="font-semibold text-[hsl(20,15%,10%)]">
              Rs. {(price * item.qty).toLocaleString("en-IN")}
            </p>
            <button
              onClick={() => removeFromCart(realId)}
              className="p-2 text-[hsl(20,10%,40%)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
