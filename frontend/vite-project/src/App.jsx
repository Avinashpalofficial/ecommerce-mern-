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
import Myorders from './pages/Myorders.jsx'
import SendOtp from './pages/SendOtp.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import LoginSecurity from './pages/LoginSecurity.jsx'
import AddressForm from './pages/AddressForm.jsx'
import CloverSignup from './pages/BusinessAccount.jsx'
import CloverWallet from './pages/Wallet.jsx'
import CloverSupportChoice from './pages/CloverSupport.jsx'

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
        element:<><ComplexNavbar/><Cart/><Footer/></>
    },
    {
        path:'/my-orders',
        element:<><ComplexNavbar/><Myorders/><Footer/></>
    },
    {
        path:'/send-otp',
        element:<><ComplexNavbar/><SendOtp/><Footer/></>
    },
    {
        path:'/verify-otp',
        element:<><ComplexNavbar/><VerifyOtp/><Footer/></>
    },
    {
        path:'/edit-profile',
        element:<><ComplexNavbar/><LoginSecurity/><Footer/></>
    },
    {
        path:'/address',
        element:<><ComplexNavbar/><AddressForm/><Footer/></>
    },
    {
        path:'/business-account',
        element:<><CloverSignup/></>
    },
    {
        path:'/clover-wallet',
        element:<><CloverWallet/></>
    },
    {
        path:'/clover-support',
        element:<><ComplexNavbar/><CloverSupportChoice/><Footer/></>
    },
          
])
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App