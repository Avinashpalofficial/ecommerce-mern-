import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
const {CloudinaryStorage}  =pkg
import multer from 'multer'
import ErrorHandler from '../utils/errorHandler.js';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'ecommerce/products',
        allowed_formats:['jpg','jpeg','png','webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})
export const upload = multer({ storage: storage,
    limits:{
         fileSize: 5 * 1024 * 1024 // 5MB
    },
     fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new ErrorHandler('Only image files are allowed!', 400), false);
        }
    }
 });
export default cloudinary;