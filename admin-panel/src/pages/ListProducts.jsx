import { useEffect, useState } from "react";
import axios from "axios";

export const ListProducts = () => {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);


  /* ================= FETCH ================= */

  const fetchProducts = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:3000/api/v1/allProducts",
        { withCredentials: true }
      );

      setProducts(data.products);
      setFiltered(data.products);

    } catch (err) {
      alert("Failed to fetch products ❌");
    } finally {
      setLoading(false);
    }
  };


  /* ================= SEARCH ================= */

  useEffect(() => {

    const result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(result);

  }, [search, products]);


  /* ================= DELETE ================= */

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await axios.delete(
        `http://localhost:3000/api/v1/admin/products/${id}`,
        { withCredentials: true }
      );

      alert("Deleted Successfully ✅");
      fetchProducts();

    } catch {
      alert("Delete Failed ❌");
    }
  };


  /* ================= EDIT ================= */

  const openEdit = (item) => {

    setEditProduct(item);

    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      stock: item.stock,
    });

    setPreview(item.images?.map(img => img.url) || []);
    setImages([]);
  };


  const removePreview = (index) => {
    setPreview(prev => prev.filter((_, i) => i !== index));
  };


  /* ================= INPUT ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleImage = (e) => {

    const files = [...e.target.files];

    if (files.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    setImages(files);
    setPreview(files.map(f => URL.createObjectURL(f)));
  };


  /* ================= UPDATE ================= */

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.entries(form).forEach(([key, val]) => {
        data.append(key, val);
      });

      images.forEach(img => data.append("images", img));


      await axios.put(
        `http://localhost:3000/api/v1/admin/products/${editProduct._id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      alert("Updated Successfully ✅");

      setEditProduct(null);
      fetchProducts();

    } catch {
      alert("Update Failed ❌");
    }
  };


  /* ================= INIT ================= */

  useEffect(() => {
    fetchProducts();
  }, []);


  if (loading) {
    return (
      <div className="p-10 text-center text-indigo-600 font-medium">
        Loading products...
      </div>
    );
  }


  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">


      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">

        <h2 className="text-2xl font-bold text-white">
          Product Management
        </h2>

        <p className="text-sm text-indigo-100">
          Manage, edit & organize your products
        </p>

      </div>


      {/* Search */}
      <div className="p-5 border-b bg-gray-50">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by name or category..."
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

      </div>


      {/* Table */}
      <div className="overflow-x-auto p-5">

        <table className="w-full text-sm border-separate border-spacing-y-2">

          <thead>

            <tr className="text-gray-600">

              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filtered.map(item => (

              <tr
                key={item._id}
                className="bg-white shadow-sm rounded-lg hover:shadow-md transition"
              >

                <td className="p-2 text-center">

                  <img
                    src={item.images?.[0]?.url}
                    className="h-12 w-12 mx-auto rounded-md object-cover"
                  />

                </td>


                <td className="p-2 font-medium">
                  {item.name}
                </td>


                <td className="p-2 text-indigo-600 font-semibold">
                  ₹{item.price}
                </td>


                <td className="p-2">
                  {item.category}
                </td>


                <td className="p-2">

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      item.stock > 10
                        ? "bg-green-100 text-green-700"
                        : item.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.stock > 0 ? item.stock : "Out"}
                  </span>

                </td>


                <td className="p-2 space-x-2">

                  <button
                    onClick={() => openEdit(item)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* ================= MODAL ================= */}

      {editProduct && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[650px] rounded-xl shadow-xl overflow-hidden">


            {/* Modal Header */}
            <div className="bg-indigo-600 p-4 text-white">

              <h3 className="text-lg font-semibold">
                Edit Product
              </h3>

            </div>


            <form onSubmit={handleUpdate} className="p-5">


              {/* Upload */}
              <label className="block mb-3 text-sm font-medium">
                Change Images
              </label>

              <input
                type="file"
                multiple
                onChange={handleImage}
                className="mb-4"
              />


              {/* Preview */}
              <div className="grid grid-cols-5 gap-3 mb-5">

                {preview.map((img, i) => (

                  <div key={i} className="relative group">

                    <img
                      src={img}
                      className="h-16 w-full rounded-lg object-cover border"
                    />

                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>

                  </div>

                ))}

              </div>


              {/* Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">

                {["name","price","stock","category"].map(field => (

                  <input
                    key={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field.toUpperCase()}
                    className="input-style"
                  />

                ))}

              </div>


              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                placeholder="Description"
                className="input-style mb-4 resize-none"
              />


              {/* Buttons */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  Update
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* Reusable Style */}
      <style>
        {`
          .input-style {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
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
