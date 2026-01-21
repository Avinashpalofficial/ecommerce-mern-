export default function CloverSupportChoice() {
  return (
    <div className="min-h-screen bg-[#f2f6f4] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">

        {/* HEADING */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          How would you like to contact Clover Support?
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CHAT CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#e2ebe6] hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e8f3ee] text-[#1f7a5b] text-xl">
                💬
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Chat right now
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Our smart assistant can quickly resolve most issues or guide you
              to the right support expert.
            </p>

            <p className="mt-3 text-sm font-medium text-[#1f7a5b]">
              Instant chat · Available 24/7
            </p>

            <button className="mt-6 w-full bg-[#1f7a5b] hover:bg-[#17634a] text-white py-3 rounded-lg font-medium transition">
              Start Chatting
            </button>
          </div>

          {/* CALL CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#e2ebe6] hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e8f3ee] text-[#1f7a5b] text-xl">
                📞
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Have us call you
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Share a few details about your issue and a Clover support expert
              will call you shortly.
            </p>

            <p className="mt-3 text-sm font-medium text-gray-500">
              Callback within minutes
            </p>

            <button className="mt-6 w-full border border-[#1f7a5b] text-[#1f7a5b] hover:bg-[#e8f3ee] py-3 rounded-lg font-medium transition">
              Call Me
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
