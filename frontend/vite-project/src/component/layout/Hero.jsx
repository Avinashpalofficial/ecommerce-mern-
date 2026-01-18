import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
const Hero = () => {
  const nevigate = useNavigate()
  
  // fetching products from backend
  
 const { products, loading, error } = useProducts();
   console.log("products:",products);
    console.log("Loading:", loading);
  console.log("Error:", error);
   

  if (loading) return <h2 className="text-center mt-6">Loading...</h2>;
  if (error) return <h2 className="text-center mt-6 text-red-500">{error}</h2>;


  return (
    <>
    <section className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        {/* LEFT TEXT SECTION */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Discover the Best Products  
            <span className="text-yellow-300"> for Your Daily Needs</span>
          </h1>

          <p className="mt-4 text-lg text-gray-100">
            Clover Store me premium quality products milte hain best prices par.
            Fast delivery & trusted by thousands of customers.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:scale-105 transition">
              Shop Now
            </button>

            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition"onClick={()=>nevigate('/about')}>
              Learn More 
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex-1 flex justify-center">
          <img
        src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            alt="Product Banner"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
     {/* //grid below hero section */}
       <section>
        <h2 className="text-3xl font-bold text-center mb-10">
          Trending Products
        </h2>

        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
            >
              <img
                src={item.images?.[0]?.url || item.images?.[1]?.url}
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold">{item.name}</h3>

              <p className="text-gray-700 mt-1">₹{item.price}</p>

              <button
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={() => nevigate(`/productdetail/${item._id || item.id}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
   
    
  );
};

export default Hero;
