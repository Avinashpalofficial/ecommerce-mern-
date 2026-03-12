import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItem } = useCart();
  const navigate = useNavigate();

  // Number() lagaya — price string aaye toh bhi NaN nahi aayega
  const totalPrice = cartItem.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-sm text-gray-600 mt-1">
              {cartItem.length === 0
                ? "No items selected"
                : `${cartItem.length} item(s) in your cart`}
            </p>
          </div>

          {cartItem.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">
                Add items to get started
              </p>
            </div>
          ) : (
            cartItem.map((item) => (
              <CartItem key={item._id || item.id} item={item} />
            ))
          )}
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Items ({cartItem.reduce((s, i) => s + i.qty, 0)})</span>
            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>

          {/* Checkout button — navigate to /address */}
          <button
            disabled={cartItem.length === 0}
            onClick={() => navigate("/address")}
            className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-full transition"
          >
            Proceed to Checkout
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Secure checkout · Easy returns
          </p>
        </div>

      </div>
    </div>
  );
}