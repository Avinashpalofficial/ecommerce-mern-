import { z} from 'zod'

const signupValidation = z.object({
    username:z.string().min(3,"username must be at least 3 characters"),
    email:z.string().min(1,"This field has to be filled").email("invalid email format"),
    password:z.string().min(8,"password must be at least  8 character"),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    dateofBirth:z.string().optional(),
    roles:z.array(z.enum(['user','admin'])).default(['user'])

})

const loginValidation = z.object({
    email:z.string().min(1,"This field had to be field").email("Invalid email format"),
    password:z.string().min(8,"Password must be at least 8 character")
})

export default {signupValidation,loginValidation}