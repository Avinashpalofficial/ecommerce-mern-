import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ComplexNavbar  from './component/layout/ComplexNavbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Footer from './component/layout/Footer'
import MyProfile from './pages/Myprofile'
import ProductCard from './ProductCard/Productdetail.jsx'
import PaymentSection from './Payment/PaymentSection'
import Cart from './cart/Cart'
import ProductList from './ProductCard/Productlist'
  
   
import ProductDetail from './ProductCard/Productdetail.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'

const router = createBrowserRouter([
  {
      path:'/',
      element:<><ComplexNavbar/> <Home/></>
  },
    {
        path:'/signup',
        element:<><Signup/><Footer/></>
    },
    {
        path:'/login',
        element:<><Login/></>
    },
    {
        path:'/about',
        element:<><ComplexNavbar/><About/></>
    },
    {
        path:'/contact',
        element:<><ComplexNavbar/><Contact/><Footer/></>
    },
    {
        path:'/blog',
        element:<><ComplexNavbar/><Blog/><Footer/></>
    },
    {
        path:'/myprofile',
        element:<><ComplexNavbar/><MyProfile/><Footer/></>
    },
     {
        path:'/allproduct',
        element:<><ComplexNavbar/><ProductList/></>
    },
    {
        path:'/productdetail/:id',
        element:<><ComplexNavbar/><ProductDetail/></>
    },
    {
        path:'/payment/:orderId',
        element:<><PaymentSection/></>
    },
   {
        path:'/order/success',
        element:<><OrderSuccess/></>
    }, 
    
    {
        path:'/cart',
        element:<><Cart/></>
    }

])
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App