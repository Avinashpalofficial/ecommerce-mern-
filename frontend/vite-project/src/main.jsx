import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import {createBrowserRouter} from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <createBrowserRouter>
    <ThemeProvider>
        <ProductProvider>
          <CartProvider>
         <App/>
         </CartProvider>
        </ProductProvider>
    </ThemeProvider>
 </createBrowserRouter>
   
)
