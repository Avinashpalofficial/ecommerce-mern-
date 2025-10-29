import express from 'express'
import {createProduct} from '../controllers/productControllers.js'
import {authUser,authAdmin} from '../middleware/auth.js'

const productRouter = express.Router()

productRouter.post('/admin/product/new',authAdmin,createProduct)

export default productRouter