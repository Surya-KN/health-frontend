import React, { useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPills,
  FaStethoscope,
  FaUtensils,
  FaRobot,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import MedicationManagement from "./medicationManagement";

// Placeholder components for feature pages
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <p>Welcome to your personalized health dashboard!</p>
  </div>
);
const ComingSoon = ({ feature }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">{feature}</h2>
    <p className="mt-4">This feature is coming soon. Stay tuned for updates!</p>
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: FaHome, text: "Dashboard", link: "/app/dashboard" },
    { icon: FaPills, text: "Medication Management", link: "/app/medication" },
    { icon: FaStethoscope, text: "Symptom Checker", link: "/app/symptoms" },
    { icon: FaUtensils, text: "Nutrition Planner", link: "/app/nutrition" },
    { icon: FaRobot, text: "Virtual Health Assistant", link: "/app/assistant" },
    {
      icon: FaClipboardList,
      text: "Clinical Trial Matcher",
      link: "/app/trials",
    },
    { icon: FaChartLine, text: "Data Dashboard", link: "/app/data" },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="bg-gradient-to-b from-green-400 to-blue-500 text-white w-64 min-h-screen p-4"
    >
      <div className="text-2xl font-bold mb-8">HealthTailor</div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-white bg-opacity-20"
                      : "hover:bg-white hover:bg-opacity-10"
                  }`
                }
              >
                <item.icon className="mr-3" />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

const MainPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <Sidebar />
      <main
        className="flex-grow bg-white bg-opacity-90 rounded-l-3xl shadow-xl overflow-hidden"
        style={{ width: "100%" }}
      >
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medication" element={<MedicationManagement />} />
          <Route
            path="symptoms"
            element={<ComingSoon feature="Symptom Checker" />}
          />
          <Route
            path="nutrition"
            element={<ComingSoon feature="Nutrition Planner" />}
          />
          <Route
            path="assistant"
            element={<ComingSoon feature="Virtual Health Assistant" />}
          />
          <Route
            path="trials"
            element={<ComingSoon feature="Clinical Trial Matcher" />}
          />
          <Route
            path="data"
            element={<ComingSoon feature="Data Dashboard" />}
          />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainPage;
