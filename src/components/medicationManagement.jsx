import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPills,
  FaClock,
  FaWarehouse,
  FaBell,
  FaPlus,
  FaTimes,
  FaExclamationTriangle,
  FaList,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

const dummyMedications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    schedule: "08:00",
    stock: 30,
    warning: "Potential interaction with ACE inhibitor genes.",
    drugs: ["lisinopril"],
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    schedule: "12:00",
    stock: 60,
    warning: null,
    drugs: ["metformin hydrochloride"],
  },
  {
    id: 3,
    name: "Simvastatin",
    dosage: "20mg",
    schedule: "20:00",
    stock: 45,
    warning:
      "Possible increased risk of myopathy based on SLCO1B1 gene variant.",
    drugs: ["simvastatin"],
  },
];

const MedicationManagement = () => {
  const [medications, setMedications] = useState([]);
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    schedule: "",
    stock: 0,
    drugs: [],
  });

  useEffect(() => {
    loadMedications();
    const notificationInterval = setInterval(checkMedicationSchedules, 60000);
    return () => clearInterval(notificationInterval);
  }, []);
  const jwtToken = localStorage.getItem("token");
  const loadMedications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:42069/api/users/medications",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Medications loaded:", response);
      setMedications(response.data.message);
    } catch (error) {
      console.error("Failed to load medications:", error);
      // toast.error("Failed to load medications. Loading dummy data.");
      setMedications(dummyMedications);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({
      ...newMedication,
      [name]:
        name === "drugs" ? value.split(",").map((drug) => drug.trim()) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:42069/api/users/medications",
        newMedication,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setMedications([...medications, response.data]);
      setNewMedication({
        name: "",
        dosage: "",
        schedule: "",
        stock: 0,
        drugs: "",
      });

      // setTimeout(() => {
      //   setIsAddingMedication(false);
      //   window.location.reload();
      // }, 2000);
      loadMedications();
      toast.success("Medication added successfully");

      // Simulate checking for gene-drug interactions
      // if (Math.random() < 0.3) {
      //   // 30% chance of a warning
      //   toast(
      //     (t) => (
      //       <span className="flex items-center">
      //         <FaExclamationTriangle className="text-yellow-500 mr-2" />
      //         Potential gene-drug interaction detected. Please consult your
      //         doctor.
      //       </span>
      //     ),
      //     { duration: 5000 }
      //   );
      // }
    } catch (error) {
      console.error("Failed to add medication:", error);
      toast.error("Failed to add medication");
    }
  };

  const updateStock = async (id, newStock) => {
    try {
      await axios.patch(`http://localhost:42069/api/medications/${id}`, {
        stock: newStock,
      });
      setMedications(
        medications.map((med) =>
          med.id === id ? { ...med, stock: newStock } : med
        )
      );
      toast.success("Stock updated successfully");
    } catch (error) {
      console.error("Failed to update stock:", error);
      toast.error("Failed to update stock");
    }
  };

  const checkMedicationSchedules = () => {
    const now = new Date();
    medications.forEach((med) => {
      const [hours, minutes] = med.schedule.split(":");
      const scheduleTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      if (now.getTime() === scheduleTime.getTime()) {
        sendNotification(med.name, med.dosage);
      }
    });
  };

  const sendNotification = (medName, dosage) => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Medication Reminder", {
            body: `Time to take ${medName} - Dosage: ${dosage}`,
            icon: "/path-to-your-icon.png",
          });
        }
      });
    }
  };

  const showDemoNotification = () => {
    sendNotification("Simvastatin", "10mg");
    toast.success("Demo notification sent!");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <motion.h2
        className="text-3xl font-bold mb-6 text-indigo-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Medication Management
      </motion.h2>

      <div className="flex justify-between mb-6">
        <motion.button
          onClick={() => setIsAddingMedication(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="mr-2" /> Add Medication
        </motion.button>
        <motion.button
          onClick={showDemoNotification}
          className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBell className="mr-2" /> Demo Notification
        </motion.button>
      </div>

      <AnimatePresence>
        {isAddingMedication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-700">
                  Add New Medication
                </h3>
                <button
                  onClick={() => setIsAddingMedication(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPills className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newMedication.name}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter medication name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dosage
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={newMedication.dosage}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., 1 pill"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Schedule
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      name="schedule"
                      value={newMedication.schedule}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Initial Stock
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaWarehouse className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="stock"
                      value={newMedication.stock}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Drugs (comma-separated)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaList className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="drugs"
                      value={newMedication.drugs}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., lisinopril, hydrochlorothiazide"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Medication
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="divide-y divide-gray-200">
          {medications.map((med) => (
            <motion.li
              key={med.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaPills className="text-indigo-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-indigo-600">
                      {med.name}
                    </div>
                    <div className="text-sm text-gray-500">{med.dosage}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-3">
                    Stock: {med.stock}
                  </span>
                  <FaClock className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{med.schedule}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Drugs: {med.drugs}
              </div>
              {med.warning && (
                <div className="mt-2 flex items-center text-sm text-yellow-600">
                  <FaExclamationTriangle className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-500" />
                  {med.warning}
                </div>
              )}
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => updateStock(med.id, med.stock - 1)}
                  className="px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Take Dose
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default MedicationManagement;
