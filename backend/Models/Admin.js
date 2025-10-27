import mongoose from "mongoose";
import validator from 'validator'
const adminSchema =  new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please enter admin name'],
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
    email: {
    type: String,
    required: [true, 'Please enter admin email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter admin password'],
    minLength: [8, 'Password should be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    default: 'admin'
  },
  permissions: {
    type: [String],
    enum: [
      'manage_products',
      'manage_orders',
      'manage_users',
      'manage_categories',
      'manage_reviews',
      'view_analytics'
    ],
     default: [
      'manage_products',
      'manage_orders',
      'manage_users',
      'manage_categories',
      'manage_reviews',
      'view_analytics'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
   lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


const Admin = mongoose.model('Admin',adminSchema)
export default Admin