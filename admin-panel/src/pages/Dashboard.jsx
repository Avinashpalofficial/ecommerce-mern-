import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/adminAuthContext";
import {
  FiPlusSquare,
  FiList,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";

export const Dashboard = () => {

  const navigate = useNavigate();
  const { logout } = useAdminAuth();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">


      {/* ================= HEADER ================= */}

      <header className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-6 shadow-md">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center font-bold">
            C
          </div>

          <h1 className="text-lg font-bold text-white tracking-wide">
            CLOVER Admin
          </h1>

        </div>


        {/* Right Area */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <FiLogOut />
          Logout
        </button>

      </header>


      {/* ================= BODY ================= */}

      <div className="flex flex-1">


        {/* ================= SIDEBAR ================= */}

        <aside className="w-64 bg-white border-r shadow-sm p-4">

          <nav className="space-y-1">


            {/* Add */}
            <NavLink
              to="/admin/add"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition relative
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiPlusSquare size={18} />
              Add Products
            </NavLink>


            {/* List */}
            <NavLink
              to="/admin/list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition relative
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiList size={18} />
              Products
            </NavLink>


            {/* Orders */}
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition relative
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <FiShoppingCart size={18} />
              Orders
            </NavLink>


          </nav>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">

          {/* Page Content */}
          <Outlet />

        </main>

      </div>

    </div>
  );
};
