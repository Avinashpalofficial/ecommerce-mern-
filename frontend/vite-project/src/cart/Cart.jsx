import CartItem from "./CartItem";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItem } = useCart();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 bg-white rounded-2xl shadow p-5">
          <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

          {cartItem.length === 0 ? (
            <p className="text-slate-500">Your cart is empty</p>
          ) : (
            cartItem.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        
      </div>
    </div>
  );
}
