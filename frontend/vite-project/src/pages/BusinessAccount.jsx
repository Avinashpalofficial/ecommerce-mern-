export default function CloverSignup() {
  return (
    <div className="min-h-screen bg-[#f2f6f4] flex items-center justify-center px-4">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT – FORM */}
          <div className="p-10 md:p-12">
            <h1 className="text-3xl font-bold text-[#1f7a5b]">
              Clover Business
            </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6">
              Create your free business account
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Use your work email to get started with Clover
            </p>

            <input
              type="email"
              placeholder="Enter email address"
              className="mt-8 w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#1f7a5b] outline-none"
            />

            <button className="mt-6 w-full bg-[#1f7a5b] hover:bg-[#17634a] text-white py-3.5 rounded-lg font-medium text-base transition">
              Get Started
            </button>

            <p className="text-sm text-gray-600 mt-5">
              Already have an account?{" "}
              <span className="text-[#1f7a5b] font-medium hover:underline cursor-pointer">
                Sign in
              </span>
            </p>
          </div>

          {/* RIGHT – BENEFITS */}
          <div className="bg-[#eef6f2] p-10 md:p-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              Why Clover Business?
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl">🚚</div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Free delivery on first order
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Save on shipping when you place your first business order.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📄</div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Tax invoices & bulk pricing
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Access GST invoices and exclusive bulk discounts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Spend analytics
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Track, monitor, and control your business spending.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#1f7a5b] mt-10 cursor-pointer hover:underline">
              Learn more about Clover Business →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
