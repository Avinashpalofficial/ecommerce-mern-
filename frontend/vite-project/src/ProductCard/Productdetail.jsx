import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import axios from "axios";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => p._id === id || p.id?.toString() === id
  );

  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    city:"",
    postalCode:"",
    country:""
  });
const [qty,setQty]= useState(1)
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddToCart = () => {
    addToCart(product);
    alert("✅ Product cart me add ho gaya");
  };

  const handlePayment = async () => {
    if (!user.name || !user.phoneNo || !user.address) {
      alert("❗ Name, Phone aur Address required hai");
      return;
    }
        
    // addToCart(products);
       try {
           const order = await axios.post('http://localhost:3000/api/v1/orders/new',
           
            {
             orderItems:[
                 {
                  name:product.name,
                  quantity:qty,
                  image:product.images?.[0]?.url,
                  price:product.price,
                  product:product._id
                 }
             ],
               shippingInfo:{
              name:user.name ,
             phoneNo:user.phoneNo ,
             email: user.email,
             address: user.address,
             city:user.city,
             postalCode:user.postalCode,
             country: user.country
               }
                
            },
           {withCredentials:true}
           )
           const orderId = order.data.message._id
           console.log('orderId',orderId);
           
           navigate(`/payment/${orderId}`);
       } catch (error) {
        console.log(error);
        alert('order create nhi hua')
        
       }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <img
           src={product.images?.[0]?.url || product.images?.[1]?.url}
              alt={product.name}
              className="rounded-xl w-full h-80 object-cover"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100"
              >
                Add to Cart
              </button>

              <button
                onClick={handlePayment}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xl font-bold text-green-600 mt-1">
              ₹{product.price}
            </p>

            <p className="mt-1 text-gray-600">{product.shortDescription}</p>

            <h3 className="mt-4 font-semibold text-lg">
              Product Details
            </h3>

            <p className="text-gray-700">{product.description}</p>

            {product.specs && (
              <ul className="list-disc ml-5 mt-3 space-y-1 text-gray-700">
                {product.specs.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm mt-4">
              <h2 className="text-lg font-semibold mb-3">
                User Required Details
              </h2>

              <div className="space-y-3">
                <input
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Full Name *"
                />

                <input
                  name="phoneNo"
                  value={user.phoneNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="phoneNo *"
                />

                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Email (optional)"
                />

                <textarea
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Address *"
                />
                <input
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="city"
                />
                <input
                  name="postalCode"
                  value={user.postalCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="postalCode"
                />
                <input
                  name="country"
                  value={user.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="country"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
