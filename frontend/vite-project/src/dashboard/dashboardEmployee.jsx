import { useEffect, useState } from "react";
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
import { useAdminStore, useDashboardStore } from "../store/authStore";
import DashboardUser from "./dashboardUser";
import DashboardMain from "./dashboardMain";
import DashboardProfile from "./dashboardProfile";
import DashboardEmployeeList from "./dashboardEmployeeList";
import DashboardSubscriptions from "./dashboardSubscriptions";

const DashboardEmployee = () => {
  const [dashboardMain, setDashboardMain] = useState(true);
  const [userContent, setUserContent] = useState(false);
  const [dashboardProfile, setDashboardProfile] = useState(false);
  const [dashboardEmployeeList, setDashboardEmployeeList] = useState(false);
  const [dashboardSubscriptions, setDashboardSubscriptions] = useState(false);
  const { allUsers, getAllUsers, getAllEmployees, getAllSubscriptions } = useDashboardStore();
  const { employee } = useAdminStore();

  useEffect(() => {
    getAllUsers();
    getAllEmployees();
    getAllSubscriptions();
  }, [getAllUsers, getAllEmployees, getAllSubscriptions]);

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-gray-900 via-orange-800 to-red-900 flex items-center justify-center relative overflow-hidden">
        {/* Floating decorative shapes */}
        <FloatingShape
          color="bg-orange-400"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-red-400"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-orange-400"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="size-11/12 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <aside
              id="separator-sidebar"
              className="w-64 transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full border-r-2 px-3 py-4 overflow-y-auto dark:bg-gray-800">
                {/* Sidebar content */}
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
                  Dashboard
                </h2>
                <ul className="space-y-2 font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                    >
                      <LayoutDashboard />
                      <span
                        className="flex-1 ms-3 whitespace-nowrap"
                        onClick={() => {
                          setDashboardMain(true);
                          setUserContent(false);
                          setDashboardProfile(false);
                          setDashboardEmployeeList(false);
                          setDashboardSubscriptions(false);
                        }}
                      >
                        Dashboard
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                      onClick={() => {
                        setDashboardMain(false);
                        setUserContent(true);
                        setDashboardProfile(false);
                        setDashboardEmployeeList(false);
                        setDashboardSubscriptions(false);
                      }}
                    >
                      <User />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Users
                      </span>
                    </a>
                  </li>
                  {
                    employee.role === "Head Admin" && (
                      <li>
                        <a
                          href="#"
                          className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                          onClick={() => {
                            setDashboardMain(false);
                            setUserContent(false);
                            setDashboardProfile(false);
                            setDashboardEmployeeList(true);
                            setDashboardSubscriptions(false);
                          }}
                        >
                          <UserCheck />
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Employees
                          </span>
                        </a>
                      </li>
                    )
                  }
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                      onClick={() => {
                        setDashboardMain(false);
                        setUserContent(false);
                        setDashboardProfile(false);
                        setDashboardEmployeeList(false);
                        setDashboardSubscriptions(true);
                      }}
                    >
                      <CreditCard />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Subscriptions
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                  <li>
                    <a
                      href="/"
                      className="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:text-white group"
                    >
                      <House />
                      <span className="ms-3">Home</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:text-white group"
                    >
                      <Book />
                      <span className="ms-3">Documentation</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:text-white group"
                      onClick={() => {
                        setDashboardMain(false);
                        setUserContent(false);
                        setDashboardProfile(true);
                        setDashboardEmployeeList(false);
                        setDashboardSubscriptions(false);
                      }}
                    >
                      <CircleUser />
                      <span className="ms-3">Profile</span>
                    </a>
                  </li>
                </ul>

                {/* Sidebar footer */}
                <div className="absolute bottom-0 left-0 w-full p-3 pb-6">
                  <p className="mt-4 text-center text-gray-400 text-sm">
                    &copy; 2025 CloudSphere. All rights reserved.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Add more content as needed */}
              {dashboardMain && <DashboardMain />}
              {userContent && <DashboardUser />}
              {dashboardProfile && <DashboardProfile />}
              {dashboardEmployeeList && <DashboardEmployeeList />}
              {dashboardSubscriptions && <DashboardSubscriptions />}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default DashboardEmployee;
