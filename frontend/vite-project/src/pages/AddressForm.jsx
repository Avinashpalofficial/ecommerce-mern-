import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AddressForm() {
  const navigate = useNavigate();
  const { cartItem, clearCart } = useCart();

  const [form, setForm] = useState({
    country: "India",
    fullName: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNo: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ── Input change handler ──
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  // ── Validation ──
  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim())    newErrors.fullName   = "Full name required";
    if (!form.street.trim())      newErrors.street     = "Street address required";
    if (!form.city.trim())        newErrors.city       = "City required";
    if (!form.state.trim())       newErrors.state      = "State required";
    if (!form.postalCode.trim())  newErrors.postalCode = "PIN code required";
    if (!form.phoneNo.trim())     newErrors.phoneNo    = "Phone number required";
    else if (!/^\d{10}$/.test(form.phoneNo.trim()))
                                  newErrors.phoneNo    = "Enter valid 10-digit number";
    return newErrors;
  };

  // ── Submit → Create Order → Go to Payment ──
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (cartItem.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    setLoading(true);
    try {
      // Build shippingInfo as backend expects
      const shippingInfo = {
        address: `${form.street}${form.apartment ? ", " + form.apartment : ""}`,
        city: form.city,
        phoneNo: Number(form.phoneNo),
        postalCode: Number(form.postalCode),
        country: form.country,
      };

      // Build orderItems as backend expects
      const orderItems = cartItem.map((item) => ({
        name: item.name,
        quantity: item.qty,           // backend ka field name 'quantity' hai
        image: item.images?.[0]?.url || item.image || "",
        price: Number(item.price),
        product: item._id || item.id,
      }));

      const { data } = await axios.post(
        `${API}/api/v1/orders/new`,
        { shippingInfo, orderItems },
        { withCredentials: true }
      );

      const orderId = data.order._id;
      navigate(`/payment/${orderId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Order place karne mein error aaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Delivery Address
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please enter your complete address
          </p>
        </div>

        <div className="space-y-4">

          {/* COUNTRY */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Country / Region
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="First and last name"
              className={`mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none
                ${errors.fullName ? "border-red-400" : ""}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* STREET */}
          <div>
            <label className="text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="House number, street name"
              className={`mt-1 w-full border rounded-lg px-4 py-2 mb-2 focus:ring-2 focus:ring-yellow-400 outline-none
                ${errors.street ? "border-red-400" : ""}`}
            />
            {errors.street && <p className="text-red-500 text-xs mb-2">{errors.street}</p>}
            <input
              type="text"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
              placeholder="Apartment, suite, floor (optional)"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* CITY & STATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none
                  ${errors.city ? "border-red-400" : ""}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none
                  ${errors.state ? "border-red-400" : ""}`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          {/* PIN & PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">PIN Code</label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="6-digit PIN"
                className={`mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none
                  ${errors.postalCode ? "border-red-400" : ""}`}
              />
              {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={form.phoneNo}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={`mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none
                  ${errors.phoneNo ? "border-red-400" : ""}`}
              />
              {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
            </div>
          </div>

          {/* ORDER SUMMARY MINI */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-sm font-medium text-gray-700 mb-2">Order Summary</p>
            <div className="space-y-1">
              {cartItem.map((item) => (
                <div key={item._id || item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{(Number(item.price) * item.qty).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{cartItem.reduce((s, i) => s + Number(i.price) * i.qty, 0).toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading || cartItem.length === 0}
            className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed
              text-black font-semibold py-3 rounded-lg transition text-base"
          >
            {loading ? "Placing Order..." : "Continue to Payment →"}
          </button>

        </div>
      </div>
    </div>
  );
}