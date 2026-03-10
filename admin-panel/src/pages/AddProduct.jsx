import { useState } from "react";
import axios from "axios";

export const AddProduct = () => {

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);


  // Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Image Upload + Preview
  const handleImage = (e) => {
    const files = [...e.target.files];

    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };


  // Remove Image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreview = preview.filter((_, i) => i !== index);

    setImages(newImages);
    setPreview(newPreview);
  };


  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || images.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("stock", form.stock || 0);

      images.forEach((img) => data.append("images", img));

      await axios.post(
        "http://localhost:3000/api/v1/admin/product/new",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product Added Successfully ✅");

      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
      });
      setImages([]);
      setPreview([]);

    } catch (err) {
      alert(err?.response?.data?.message || "Product creation failed ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white">
          Add New Product
        </h2>
        <p className="text-sm text-indigo-100">
          Fill product details carefully
        </p>
      </div>


      <form onSubmit={handleSubmit} className="p-6">

        {/* Image Upload */}
        <div className="mb-8">

          <p className="text-sm font-semibold mb-2 text-gray-700">
            Product Images (Max 5)
          </p>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg h-32 cursor-pointer hover:bg-indigo-50 transition">

            <span className="text-indigo-600 font-medium">
              Click to Upload
            </span>
            <span className="text-xs text-gray-500">
              JPG / PNG / WEBP
            </span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          </label>


          {/* Preview */}
          {preview.length > 0 && (
            <div className="grid grid-cols-5 gap-4 mt-4">

              {preview.map((img, i) => (
                <div key={i} className="relative group">

                  <img
                    src={img}
                    alt="preview"
                    className="h-24 w-full object-cover rounded-lg border"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>


        {/* Grid Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-style"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input-style"
              placeholder="Enter price"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="input-style"
              placeholder="Available stock"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Cameras">Cameras</option>
              <option value="Laptops">Laptops</option>
              <option value="Accessories">Accessories</option>
              <option value="Headphones">Headphones</option>
              <option value="Food">Food</option>
              <option value="Books">Books</option>
              <option value="Clothes/Shoes">Clothes / Shoes</option>
              <option value="Beauty/Health">Beauty / Health</option>
              <option value="Sports">Sports</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Home">Home</option>
            </select>
          </div>

        </div>


        {/* Description */}
        <div className="mb-6">

          <label className="text-sm text-gray-600">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="input-style resize-none"
            placeholder="Write product details..."
          />

        </div>


        {/* Submit Button */}
        <div className="flex justify-end">

          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Create Product"}
          </button>

        </div>

      </form>


      {/* Reusable Input Style */}
      <style>
        {`
          .input-style {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            margin-top: 4px;
            outline: none;
            transition: all 0.2s;
          }

          .input-style:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          }
        `}
      </style>

    </div>
  );
};
