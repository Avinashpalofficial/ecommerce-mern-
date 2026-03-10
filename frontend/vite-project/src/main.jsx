import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import {createBrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <createBrowserRouter>
    <AuthProvider>
           <ThemeProvider>
        <ProductProvider>
          <CartProvider>
         <App/>
         </CartProvider>
        </ProductProvider>
    </ThemeProvider>
    </AuthProvider>
 </createBrowserRouter>
   
)
