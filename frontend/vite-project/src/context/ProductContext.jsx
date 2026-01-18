import { createContext,useState, useContext,useEffect} from "react";
import axios from 'axios'
const ProductContext = createContext();

export function ProductProvider({children}){
          const [products, setProducts] = useState([])
          const [loading,setLoading] = useState(false)
          const [error,setError] =  useState(null)

      //filters
      const [category, setCategory] = useState('all')   
     
      //fetching the products
      const fetchProducts = async()=>{
          try {
             setLoading(true)
             setError(false)
             const response = await axios.get('http://localhost:3000/api/v1/allProducts')
             console.log("pro:",response);
             
             setProducts(response.data.products)

          } catch (error) {
            setError(
                error.response?.data?.message || 'something went wrong'
            )
            
          }
          finally {
      setLoading(false);
    }
      }

      useEffect(()=>{
            fetchProducts()
      },[])
      //filter the products
      const filteredProducts = 
      category ==='all'
      ? products 
      : products.filter(
        (product) => product.category ===category
      )
      
    return (
      <ProductContext.Provider
      
     value =  {{products,filteredProducts,loading,error,setCategory,
      refetch:fetchProducts
     }}
      >
         {children}
      </ProductContext.Provider>
    )
}
//
 export const  useProducts =()=> useContext(ProductContext)
