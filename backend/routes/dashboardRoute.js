import express  from 'express'
import { authAdmin } from '../middleware/auth.js'
import { getDashboardStats } from '../controllers/dashboardController.js'
export const  DashboardRouter = express.Router()

DashboardRouter.get('/dashboard/stats',authAdmin,getDashboardStats)
