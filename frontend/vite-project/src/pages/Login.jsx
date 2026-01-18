import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form ,setForm] = useState({
      email :'',
      password:''
    })
    const [error,setError]= useState("")
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
       const {name,value} = e.target
       setForm((prev)=>({...prev , [name]:value}) )
    }
      const handleLogin = async(e)=>{
        e.preventDefault()
        setError('')
        try {
             const res =  await axios.post('http://localhost:3000/api/v1/auth/user/login',form,
              {
                headers: {"Content-Type":'application/json'},
                 withCredentials: true
              }
             )
             //token save
             localStorage.setItem("token", res.data.token);
             if(res.data.user){
                       localStorage.setItem('user',JSON.stringify(res.data.user))
             }
             alert('login successful')
             navigate('/')
     } catch (error) {
  if (error.response) {
    setError(error.response.data.msg || "Login failed");
  } else {
    setError("Server error, try again later");
  }
}


      }
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-50 to-purple-50">

      {/* LEFT WELCOME PANEL */}
      <div className="hidden md:flex flex-col justify-center items-center p-12 
      bg-gradient-to-br from-indigo-200/80 via-purple-200/80 to-blue-200/80
      backdrop-blur-xl border-r border-white/40 shadow-xl">

        <Typography variant="h2" className="font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Welcome Back 👋
        </Typography>

        <Typography className="text-gray-700 text-lg text-center leading-relaxed max-w-md">
          Login to continue your journey with a clean and modern interface.
          We’re happy to see you again!
        </Typography>

        <div className="mt-8">
          <span className="px-6 py-3 text-lg rounded-xl bg-white/50 backdrop-blur-md shadow text-gray-700 font-semibold">
            Secure & Fast Login 🔐
          </span>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex justify-center items-center p-6">
        <div className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-2xl 
        p-10 rounded-3xl w-[400px] sm:w-[480px]">

          <Typography variant="h4" color="blue-gray" className="text-center mb-4 font-bold">
            Login
          </Typography>

          <Typography color="gray" className="text-center text-sm mb-6">
            Nice to meet you again.
          </Typography>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <Input
              size="lg"
              label="Email Address"
              name='email'
              value={form.email}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Checkbox
              label={
                <Typography color="gray" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="underline font-medium text-indigo-600">
                    Terms & Conditions
                  </a>
                </Typography>
              }
            />

            <Button
            type="submit"
              fullWidth
              className="rounded-xl py-3 bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Login
            </Button>

            <Typography color="gray" className="text-center text-sm">
              Create new account?{" "}
              <a href="/signup" className="font-semibold text-indigo-700 underline">
                Sign Up
              </a>
            </Typography>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;
