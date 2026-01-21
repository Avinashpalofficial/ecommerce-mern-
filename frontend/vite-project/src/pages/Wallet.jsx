export default function CloverWallet() {
  return (
    <div className="min-h-screen bg-[#f3f7f5] p-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-[#1f7a5b] mb-6">
          Clover Wallet
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT MAIN SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* BALANCE CARD */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Total Balance
                </h2>
                <span className="text-2xl font-bold text-[#1f7a5b]">
                  ₹0.00
                </span>
              </div>

              <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Wallet</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Gift Balance</span>
                  <span>₹0.00</span>
                </div>
              </div>
            </div>

            {/* ADD MONEY */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add money to Wallet
              </h2>

              <div className="border rounded-xl p-4 mb-4">
                <label className="text-sm text-gray-500">Enter Amount</label>
                <div className="text-3xl font-bold text-gray-800 mt-1">
                  ₹1000
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                {["+500", "+1000", "+1500"].map((amt) => (
                  <button
                    key={amt}
                    className="border rounded-lg px-4 py-2 text-sm hover:bg-[#e8f3ee] transition"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-4">
                You can add up to ₹10,000 at a time
              </p>

              <button className="bg-[#ffd84d] hover:bg-[#ffcf2e] text-black font-medium px-6 py-3 rounded-full transition">
                Set up wallet to add money
              </button>
            </div>

            {/* OFFERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Earn ₹10 back",
                "Earn up to ₹50 back",
                "Scratch & Win",
              ].map((offer) => (
                <div
                  key={offer}
                  className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                >
                  <div className="text-sm font-medium text-gray-800">
                    {offer}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    On eligible payments
                  </p>
                  <button className="mt-3 text-sm text-[#1f7a5b] font-medium">
                    Add money →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Do more with Clover Wallet
              </h3>

              {[
                "Add Gift Balance",
                "Add Cash",
                "Transaction History",
              ].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center py-3 border-b last:border-none cursor-pointer hover:text-[#1f7a5b]"
                >
                  <span>{item}</span>
                  <span>›</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Manage
              </h3>
              <div className="flex justify-between items-center cursor-pointer hover:text-[#1f7a5b]">
                <span>Account Settings</span>
                <span>›</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
