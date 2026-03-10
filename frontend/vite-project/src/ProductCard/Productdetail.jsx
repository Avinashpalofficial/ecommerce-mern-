import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import axios from "axios";
import { motion } from "framer-motion";

export default function ProductDetail() {

  const navigate = useNavigate();
  const { id } = useParams();

  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p._id === id || p.id?.toString() === id
  );

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loadingPay, setLoadingPay] = useState(false);

  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });


  if (!product)
    return <h2 className="text-center mt-10">Product not found</h2>;


  const handleChange = (e) =>
    setUser((p) => ({ ...p, [e.target.name]: e.target.value }));


  /* ================= CART ================= */

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    alert("✅ Added to cart");
  };


  /* ================= PAYMENT ================= */

  const handlePayment = async () => {

    if (!user.name || !user.phoneNo || !user.address) {
      alert("❗ Fill required fields");
      return;
    }

    try {

      setLoadingPay(true);

      const order = await axios.post(
        "http://localhost:3000/api/v1/orders/new",

        {
          orderItems: [
            {
              name: product.name,
              quantity: qty,
              image: product.images?.[0]?.url,
              price: product.price,
              product: product._id,
            },
          ],

          shippingInfo: user,
        },

        { withCredentials: true }
      );

      navigate(`/payment/${order.data.message._id}`);

    } catch (err) {

      alert("❌ Order failed");

    } finally {
      setLoadingPay(false);
    }
  };


  /* ================= ANIMATION ================= */

  const fade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };


  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fade}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-100 py-12 px-4"
    >

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 grid md:grid-cols-2 gap-10">


        {/* ================= IMAGE GALLERY ================= */}

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >

          {/* MAIN IMAGE */}
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={
              product.images?.[activeImg]?.url ||
              product.images?.[0]?.url
            }
            className="rounded-2xl h-96 w-full object-cover shadow-lg"
          />


          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 justify-center">

            {product.images?.map((img, i) => (

              <img
                key={i}
                src={img.url}
                onClick={() => setActiveImg(i)}
                className={`
                  h-16 w-16 object-cover rounded-lg cursor-pointer
                  border-2 transition
                  ${activeImg === i
                    ? "border-blue-600 scale-110"
                    : "border-gray-300"}
                `}
              />

            ))}

          </div>

        </motion.div>


        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >

          {/* TITLE */}
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl text-green-600 font-semibold">
            ₹{product.price}
          </p>


          {/* SHORT DESC */}
          <p className="text-gray-600">
            {product.shortDescription}
          </p>


          {/* QUANTITY */}
          <div className="flex items-center gap-4">

            <span className="font-semibold">
              Quantity:
            </span>

            <div className="flex items-center border rounded-lg">

              <button
                onClick={() => setQty((p) => Math.max(1, p - 1))}
                className="px-3 py-1 hover:bg-gray-200"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={() => setQty((p) => p + 1)}
                className="px-3 py-1 hover:bg-gray-200"
              >
                +
              </button>

            </div>

          </div>


          {/* BUTTONS */}
          <div className="flex gap-4">

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-xl"
            >
              Add to Cart
            </motion.button>


            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePayment}
              disabled={loadingPay}
              className="flex-1 bg-blue-600 text-white py-2 rounded-xl shadow"
            >
              {loadingPay ? "Processing..." : "Buy Now"}
            </motion.button>

          </div>


          {/* DESCRIPTION */}
          <div>

            <h3 className="font-semibold text-lg">
              Product Details
            </h3>

            <p className="text-gray-700 mt-1">
              {product.description}
            </p>

          </div>


          {/* ================= FORM ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 p-5 rounded-2xl shadow-inner"
          >

            <h2 className="font-semibold mb-3">
              Shipping Details
            </h2>

            <div className="grid grid-cols-2 gap-3">

              {[
                "name",
                "phoneNo",
                "email",
                "city",
                "postalCode",
                "country",
              ].map((f) => (

                <motion.input
                  key={f}
                  name={f}
                  value={user[f]}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.03 }}
                  className="p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder={f}
                />

              ))}

              <motion.textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                whileFocus={{ scale: 1.03 }}
                rows="2"
                className="col-span-2 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Address"
              />

            </div>

          </motion.div>

        </motion.div>

      </div>

    </motion.div>
  );
}
