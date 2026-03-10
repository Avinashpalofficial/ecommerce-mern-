import { createBrowserRouter, RouterProvider,Navigate  } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login.jsx";
import { AdminPrivateRoute } from "./component/layout/AdminPrivateRoute";
import { AddProduct } from "./pages/AddProduct.jsx";
import { ListProducts } from "./pages/ListProducts.jsx";
import { Order } from "./pages/OrderProducts.jsx";
const router = createBrowserRouter([

  // Login
   {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // Admin Layout (Dashboard = Sidebar + Header)
  {
    path: "/admin",
    element: (
      <AdminPrivateRoute>
        <Dashboard />
      </AdminPrivateRoute>
    ),

    // 👇 CHILD ROUTES (Sidebar ke andar open honge)
    children: [

      // Default → Add Page
    //   {
    //     index: true,
    //     element: <AddProduct />,
    //   },

      // /admin/add
      {
        path: "add",
        element: <AddProduct />,
      },

     
      {
        path: "list",
        element: <ListProducts />,
      },
      {
        path: "orders",
        element: <Order />,
      },

    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
