import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  UserCheck,
  Loader,
  LayoutDashboard,
  CreditCard,
  House,
  Book,
  CircleUser,
} from "lucide-react";
import Input from "../components/Input";
import FloatingShape from "../components/FloatingShape";
import { useAdminStore } from "../store/authStore";

const DashboardProfile = () => {
  const { employee, logoutEmployee } = useAdminStore();

  const handleLogout = () => {
    logoutEmployee();
  }

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-boxld mb-6 bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
          Employee Profile
        </h2>

        <div className="text-xl mt-8 pl-2 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
          <p>
            User: <span>{employee.name}</span>
          </p>
          <p>Email: {employee.email}</p>
          <p>
            Created At:{" "}
            {employee.createdAt.slice(0, 10).split("-").reverse().join("-")}
          </p>
          <p>Role: {employee.role}</p>
        </div>
        <motion.button
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg shadow-lg hover:from-orange-600
          hover:to-red-700"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </div>
    </>
  );
};

export default DashboardProfile;
