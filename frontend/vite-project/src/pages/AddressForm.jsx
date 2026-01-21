export default function AddressForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add Delivery Address
          </h2>
          <p className="text-sm text-gray-500">
            Please enter your complete address
          </p>
        </div>

        {/* AUTOFILL BANNER */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-700">
            Save time. Autofill your current location.
          </p>
          <button className="px-4 py-1.5 border border-blue-500 text-blue-600 rounded-md text-sm hover:bg-blue-100 transition">
            Autofill
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* COUNTRY */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Country / Region
            </label>
            <select className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none">
              <option>India</option>
              <option>Haiti</option>
              <option>USA</option>
            </select>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="First and last name"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* STREET */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              placeholder="House number, street name"
              className="mt-1 w-full border rounded-lg px-4 py-2 mb-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="text"
              placeholder="Apartment, suite, floor (optional)"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* CITY & STATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                State / Province
              </label>
              <input
                type="text"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>

          {/* PIN & PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                PIN Code
              </label>
              <input
                type="text"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="For delivery updates"
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>

          {/* DEFAULT CHECKBOX */}
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" className="w-4 h-4 accent-yellow-400" />
            <label className="text-sm text-gray-700">
              Use as my default address
            </label>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition">
            Save Address
          </button>

        </div>
      </div>
    </div>
  );
}
