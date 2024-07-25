// components/CompleteProfile.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaCalendar, FaVenusMars, FaFileUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const Completeprofile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        birthdate,
        gender,
      })
    );

    if (file) {
      formData.append("vcf", file);
    }
    const token = localStorage.getItem("token");
    try {
      // TODO: Replace with your actual API endpoint

      const response = await axios.post(
        "http://localhost:42069/api/users/completeprofile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Profile completed successfully!");
        navigate("/dashboard");
      } else {
        console.log("Failed to complete profile", response);
        throw new Error("Failed to complete profile");
      }
    } catch (error) {
      toast.error("Failed to complete profile. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <FaUser className="absolute top-3 left-3 text-white" />
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="relative flex-1">
              <FaUser className="absolute top-3 left-3 text-white" />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="relative">
            <FaCalendar className="absolute top-3 left-3 text-white" />
            <input
              type="date"
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaVenusMars className="absolute top-3 left-3 text-white" />
            <select
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            <FaFileUpload className="absolute top-3 left-3 text-white" />
            <input
              type="file"
              className="w-full bg-white bg-opacity-20 rounded-lg py-2 px-10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-green-700 hover:file:bg-green-50"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white text-green-500 font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
          >
            Complete Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Completeprofile;
