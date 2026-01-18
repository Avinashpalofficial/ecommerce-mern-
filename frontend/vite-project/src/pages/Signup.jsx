import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/user/register",
        formData
      );

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-50 to-purple-50">

      {/* LEFT SIDE - MATCHED HEIGHT PANEL */}
      <div className="flex flex-col justify-center p-12 items-center 
      bg-gradient-to-br from-indigo-200/80 via-purple-200/80 to-blue-200/80
      backdrop-blur-xl border-r border-white/40 shadow-xl">

        <div className="max-w-md text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow">
            Welcome to Our Website 👋
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Join a clean and modern UI experience with smooth colors & great design.
          </p>

          <div className="mt-8">
            <span className="px-7 py-3 text-lg rounded-xl 
            bg-white/70 backdrop-blur-md shadow font-semibold text-gray-700">
              Start Your Journey 🚀
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="flex justify-center items-center p-6">
        <div className="backdrop-blur-xl bg-white/70 border border-white/60 
        shadow-2xl p-10 rounded-3xl w-[450px] sm:w-[520px]">

          <Typography variant="h4" className="text-center font-bold mb-4">
            Create an Account
          </Typography>

          <Typography color="gray" className="text-center mb-8 text-sm">
            Please fill in your details to continue.
          </Typography>

          <form className="flex flex-col gap-5" onSubmit={submitHandler}>
            <Input
              size="lg"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Input
              size="lg"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Input
              size="lg"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Input
              size="lg"
              label="Email address"
              name="email"
              value={formData.email}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleSubmit}
              className="!border-gray-300 rounded-xl"
            />

            <Checkbox
              label={
                <Typography color="gray" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="underline text-indigo-600 font-medium">
                    Terms & Conditions
                  </a>
                </Typography>
              }
            />

            <Button
              fullWidth
              type="submit"
              className="rounded-xl py-3 bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              {loading ? "Please wait..." : "Sign Up"}
            </Button>

            <Typography color="gray" className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-700 underline font-semibold">
                Login
              </a>
            </Typography>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
