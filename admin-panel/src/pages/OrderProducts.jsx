import { useEffect, useState } from "react";
import axios from "axios";

export const Order = () => {

  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  /* ================= FETCH ================= */

  const fetchOrders = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:3000/api/v1/admin/orders",
        { withCredentials: true }
      );

      setOrders(data.orders);
      setFiltered(data.orders);

    } catch {
      alert("Failed to fetch orders ❌");
    } finally {
      setLoading(false);
    }
  };


  /* ================= FILTER + SEARCH ================= */

  useEffect(() => {

    let result = orders;

    if (search) {
      result = result.filter(o =>
        o._id.toLowerCase().includes(search.toLowerCase()) ||
        (typeof o.user === "object"
          ? o.user._id
          : o.user
        )?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter(o => o.orderStatus === statusFilter);
    }

    setFiltered(result);

  }, [search, statusFilter, orders]);


  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:3000/api/v1/admin/orders/${id}`,
        { orderStatus: status },
        { withCredentials: true }
      );

      fetchOrders();

    } catch {
      alert("Update Failed ❌");
    }
  };


  /* ================= DELETE ================= */

  const deleteOrder = async (id) => {

    if (!window.confirm("Delete this order?")) return;

    try {

      await axios.delete(
        `http://localhost:3000/api/v1/admin/orders/${id}`,
        { withCredentials: true }
      );

      fetchOrders();

    } catch {
      alert("Delete Failed ❌");
    }
  };


  /* ================= INIT ================= */

  useEffect(() => {
    fetchOrders();
  }, []);


  /* ================= STATUS BADGE ================= */

  const getStatusColor = (status) => {

    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };


  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-indigo-600 font-medium">
        Loading orders...
      </div>
    );
  }


  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">


      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">

        <h2 className="text-2xl font-bold text-white">
          Order Management
        </h2>

        <p className="text-sm text-indigo-100">
          Track & manage customer orders
        </p>

      </div>


      {/* Filters */}
      <div className="p-5 bg-gray-50 border-b flex flex-wrap gap-4">


        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Order / User ID..."
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />


        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Status</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>


      {/* Table */}
      <div className="overflow-x-auto p-5">

        <table className="w-full text-sm border-separate border-spacing-y-2">


          <thead>

            <tr className="text-gray-600">

              <th>Order ID</th>
              <th>User ID</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>


            {filtered.length === 0 && (

              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>

            )}


            {filtered.map(order => (

              <tr
                key={order._id}
                className="bg-white shadow-sm rounded-lg hover:shadow-md transition"
              >


                <td className="p-2 text-xs font-mono">
                  {order._id.slice(0, 12)}...
                </td>


                <td className="p-2 text-xs">
                  {typeof order.user === "object"
                    ? order.user._id
                    : order.user}
                </td>


                <td className="p-2 text-center">
                  {order.orderItems?.length}
                </td>


                <td className="p-2 font-semibold text-indigo-600">
                  ₹{order.totalPrice}
                </td>


                {/* Status */}
                <td className="p-2">


                  <div className="flex items-center gap-2">


                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>


                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                  </div>

                </td>


                {/* Actions */}
                <td className="p-2 space-x-2 text-center">


                  <button
                    onClick={() =>
                      window.open(`/admin/order/${order._id}`)
                    }
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs"
                  >
                    View
                  </button>


                  <button
                    onClick={() => deleteOrder(order._id)}
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

    </div>
  );
};
