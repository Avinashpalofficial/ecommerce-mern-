import express from 'express'
// import authUser from '../middleware/auth.js'
import {registerUser,loginUser ,logoutUser,forgotPassword,resetpassword} from '../controllers/authController.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.post('/password/forgot',forgotPassword)
router.put('/password/reset/:token',resetpassword)

export default router