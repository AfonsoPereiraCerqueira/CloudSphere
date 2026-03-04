import React, { useEffect } from 'react'
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
  CircleFadingArrowUp,
  Info,
  CircleHelp,
  Power,
  HardDrive,
  Computer,
  Cpu,
  MemoryStick,
  Waypoints,
  KeyRound,
  Wifi,
  Copy,
  Eye,
  EyeOff,
  MonitorCog,
  MapPin,
  ChevronsLeftRightEllipsis,
  LifeBuoy,
} from "lucide-react";
import Input from "../components/Input";
import FloatingShape from "../components/FloatingShape";
import { useAuthStore, useVPSStore } from '../store/authStore';
import toast from "react-hot-toast";
import LoadingSpinner from '../components/LoadingSpinner';

const serviceDashboard = () => {
      const { user, checkActiveSubscription, haveSubscription, isCheckingSubscription } = useAuthStore()

      useEffect(() => {
        if (user) {
          checkActiveSubscription(user._id);
        }
      }, [user]);

      const { getVPS, vps, turnVPSOff, turnVPSOn, rebootVPS } = useVPSStore();

      const [vpsStatus, setVpsStatus] = useState("");
      const [vpsName, setVpsName] = useState("");
      const [diskUsage, setDiskUsage] = useState("25Gb");
      const [cpuUsage, setCpuUsage] = useState("47%");
      const [ramUsage, setRamUsage] = useState("23%");
      const [ipAddress, setIpAddress] = useState("");
      const [vpsUser, setVpsUser] = useState("");
      const [vpsOS, setVpsOS] = useState("");
      const [vpsLocation, setVpsLocation] = useState("");
      const [vpsType, setVpsType] = useState("");
      const [vpsPort, setVpsPort] = useState("8080");
      const [password, setPassword] = useState("********");
      const [passwordReavealed, setPasswordReavealed] = useState(false);

      useEffect(() => {
          getVPS(user._id);
      }, []);

      useEffect(() => {
          if (vps) {
                setVpsStatus(vps.vps[0].vpsStatus);
                setVpsName(vps.vps[0].vpsName);
                setIpAddress(vps.vps[0].vpsIP);
                setVpsUser(vps.vps[0].vpsUsername);
                setVpsOS(vps.vps[0].vpsOS);
                setVpsLocation(vps.vps[0].vpsLocation);
                setVpsType(vps.vps[0].vpsType);
          }
      }, [vps]);

      const revealPassword = () => {
            if (passwordReavealed) {
                  setPassword("********");
                  setPasswordReavealed(false);  
                  return;
            } else {
                  setPassword(vps.vps[0].vpsPassword);
                  setPasswordReavealed(true);
                  return;
            }
      }

      const copyPassword = () => {
            navigator.clipboard.writeText(vps.vps[0].vpsPassword);
      } 
      const turnOffVPS = async () => {
            if (vps.vps[0].vpsStatus === "ON") {
                  toast.success("Command sent to turn OFF VPS, please wait...");

                  setTimeout( async () => {
                        toast.success("VPS has been turned OFF");
                        await turnVPSOff(user._id);
                        location.reload();
                  }, 4000);

                  return;
            } else {
                  toast.success("Command sent to turn ON VPS, please wait...");

                  setTimeout( async () => {
                    toast.success("VPS has been turned ON");
                    await turnVPSOn(user._id);
                    location.reload();
                  }, 4000);
                  return;
            }
      }

      const Reboot = async () => {
            toast.success("Command sent to reboot VPS, please wait...");

            setTimeout(() => {
              toast.success("VPS has been rebooted");
              rebootVPS(user._id);
              location.reload();
            }, 3000);
      }

      if (isCheckingSubscription) {
        return <LoadingSpinner />
      }

      return (
        <>
        {haveSubscription ? (

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
                      Client Area
                    </h2>
                    <ul className="space-y-2 font-medium">
                      <li>
                        <a
                          href="/service-dashboard"
                          className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                        >
                          <LayoutDashboard />
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Dashboard
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/service-information"
                          className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                        >
                          <Info />
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Informations
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/contact"
                          className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                        >
                          <CircleHelp />
                          <span className="flex-1 ms-3 whitespace-nowrap">
                            Support
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
                  <div className="mt-4 text-white">
                    <h3 className="text-xl font-semibold">Dashboard</h3>
                    <p className="text-gray-400">Welcome to your Dashboard!</p>

                    <div className="mt-8">
                      <motion.div
                        className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-xl font-semibold text-orange-400 mb-3">
                          Machine Informations
                        </h3>

                        <div className="flex items-center space-x-2 mt-2">
                          <Power size={24} />
                          <p className="text-gray-300">Status:</p>
                          {vpsStatus === "ON" ? (
                            <span className="text-emerald-400 font-semibold">
                              {vpsStatus}
                            </span>
                          ) : (
                            <span className="text-red-400 font-semibold">
                              {vpsStatus}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <Computer size={24} />
                          <p className="text-gray-300">Machine Name:</p>
                          <span className="text-emerald-400 font-semibold">
                            {vpsName}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <MonitorCog size={24} />

                          <p className="text-gray-300">OS:</p>
                          <span className="text-emerald-400 font-semibold">
                            {vpsOS}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <HardDrive size={24} />

                          <p className="text-gray-300">Disk Usage:</p>
                          <span className="text-emerald-400 font-semibold">
                            {diskUsage} / 60Gb
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <Cpu size={24} />

                          <p className="text-gray-300">CPU Usage:</p>
                          <span className="text-emerald-400 font-semibold">
                            {cpuUsage}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <MemoryStick size={24} />

                          <p className="text-gray-300">RAM Usage:</p>
                          <span className="text-emerald-400 font-semibold">
                            {ramUsage}
                          </span>
                        </div>

                        <div className="mt-2 border-t border-gray-700 pt-2">
                          <div className="flex items-center space-x-2">
                            <Waypoints size={24} />
                            <p className="text-gray-300">IP Address:</p>
                            <span className="text-emerald-400 font-semibold">
                              {ipAddress}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <ChevronsLeftRightEllipsis size={24} />
                            <p className="text-gray-300">Port:</p>
                            <span className="text-emerald-400 font-semibold">
                              {vpsPort}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <MapPin size={24} />
                            <p className="text-gray-300">Location:</p>
                            <span className="text-emerald-400 font-semibold">
                              {vpsLocation}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <LifeBuoy size={24} />
                            <p className="text-gray-300">Type:</p>
                            <span className="text-emerald-400 font-semibold">
                              {vpsType}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <User size={24} />
                            <p className="text-gray-300">User:</p>
                            <span className="text-emerald-400 font-semibold">
                              {vpsUser}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <KeyRound size={24} />
                            <p className="text-gray-300">Password:</p>
                            <span className="text-emerald-400 font-semibold">
                              {password}{" "}
                              <motion.button
                                whileHover={{ sclae: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => revealPassword()}
                                className="ml-2 p-2 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                                    font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                              >
                                {passwordReavealed ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </motion.button>
                              <motion.button
                                whileHover={{ sclae: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyPassword()}
                                className="ml-2 p-2 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                                    font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                              >
                                <Copy size={16} />
                              </motion.button>
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => turnOffVPS()}
                          className="mt-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                              font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          Turn {vpsStatus === "ON" ? "OFF" : "ON"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => Reboot()}
                          className="mt-2 ml-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                              font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          Reboot
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ): (
          <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-white">Error 500</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page Forbiden</h1>
              <p className="mt-6 text-base leading-7 text-white">Sorry, you don't have a current subscription active. If you have please contact support</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/"
                  className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </a>
              </div>
            </div>
          </main>
        )}
        </>
      );
}

export default serviceDashboard