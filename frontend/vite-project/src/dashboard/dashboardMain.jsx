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

const DashboardMain = () => {
  const { employee } = useAdminStore();

  return (
    <>
      <div className="mt-4 text-white">
        <h3 className="text-xl font-semibold">Hello, {employee.name}</h3>
        <p className="text-gray-400">
          Here you can manage your employees, subscriptions, and more.
        </p>
      </div>
    </>
  );
};

export default DashboardMain;
