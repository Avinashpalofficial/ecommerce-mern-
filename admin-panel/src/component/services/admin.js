import { api } from "./api"


 export const getProducts = async(params= {})=>{
       const res =  await  api.get('/allProducts',{params})
       return res.data
 }

 export const createProduct = async(productData)=>{
         const res = await api.post('/admin/product/new',productData)
         return res.data
 }

 export const getSingleProduct = async(id)=>{
    const res = await api.get(`/product/${id}`)
    return res.data
 }
 export const updateProduct = async(id,productData)=>{
           const res = await api.put(`/admin/products/${id}`,productData)
            return res.data
 }
 export const deleteProduct = async(id)=>{
     const res = await api.delete(`/admin/products/${id}`)
     return res.data
 }

 //orders
 export const  allOrders= async(params={})=>{
          const res = await api.get('/admin/orders',{params})
          return res.data
 }
 export const UpdateOrder = async(id ,status)=>{
     const res =   await api.put(`admin/orders/${id}`,{status})
     return res.data
 }
 export const deleteOrder = async(id)=>{
          const res = await api.delete(`admin/orders/${id}`)
          return res.data
 }
 export const getSingleOrder = async(id)=>{
                 const res = await api.get(`admin/orders/${id}`)
                 return res.data
 }