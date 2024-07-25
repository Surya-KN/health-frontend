import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaDna } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:42069/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("Successfully registered!");
        navigate("/login");
      } else {
        console.log("Registration failed");
        toast.error("Registration failed");
        // Handle registration failure
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Error:", error.response.data);
        toast.error(error.response.data.data);
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
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
          <h2 className="text-3xl font-bold mt-4 text-white">
            Join HealthTailor
          </h2>
          <p className="text-white opacity-80">
            Create your personalized health account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-white" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            className="w-full bg-white text-purple-500 font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
          >
            Create Account
          </motion.button>
        </form>
        <p className="mt-6 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="font-bold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
