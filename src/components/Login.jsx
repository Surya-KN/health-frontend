import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaDna } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:42069/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const token = data.token;

        login({ email }, token);
        toast.success("Successfully logged in!");

        navigate("/app");
      } else {
        console.log("Login failed");
        toast.error("Login failed");
        // Handle login failure
      }
    } catch (error) {
      console.log("Error:", error.response.data);
      toast.error(error.response.data.data);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      {isLoading && (
        <>
          <Loader />
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <FaDna className="text-6xl text-white mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold mt-4 text-white">Welcome Back</h2>
          <p className="text-white opacity-80">
            Log in to your HealthTailor account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-white" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-white" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white text-green-500 font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Log In"}
          </motion.button>
        </form>
        <p className="mt-6 text-center text-white">
          Don&apost have an account?{" "}
          <Link to="/register" className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
