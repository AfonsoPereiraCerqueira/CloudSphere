import React, { useEffect } from "react";
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
  CircleHelp,
  Receipt,
  Info,
  Euro,
  Barcode,
} from "lucide-react";
import Input from "../components/Input";
import FloatingShape from "../components/FloatingShape";
import { useAuthStore, useSubscriptionStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import LoadingSpinner from "../components/LoadingSpinner";

const serviceInformation = () => {

      const { user, checkActiveSubscription, haveSubscription, isCheckingSubscription, cancelSub } = useAuthStore()

      useEffect(() => {
        if (user) {
          checkActiveSubscription(user._id);
        }
      }, [user]);

      const { verifySubscription, subscription } = useSubscriptionStore();
      const [ subStatus, setSubStatus ] = useState("");
      const [ subId, setSubId ] = useState("");
      const [ subNextPayment, setSubNextPayment ] = useState("");
      const [ subValue, setSubValue ] = useState("");
      const [ subPaypalId, setSubPaypalId ] = useState("");

      useEffect(() => {
        verifySubscription(user._id);
      }, [verifySubscription]);

      useEffect(() => {
        if (subscription) {
          setSubStatus(subscription.subscription.status);
          setSubId(subscription.subscription._id);
          setSubNextPayment(formatDate(subscription.subscription.expireAt));
          setSubValue(subscription.subscription.paymentValue);
          setSubPaypalId(subscription.subscription.subId);
        }
      }, [subscription]);

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
                <h3 className="text-xl font-semibold">Service Information</h3>
                <p className="text-gray-400">
                  Hello, {user.name}
                  <br />
                  Here you can view your service information.
                </p>
                <motion.div
                  className="mt-8 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User size={24} />
                      <span className="ms-2 text-white">Username</span>
                    </div>
                    <span className="text-white">{user.name}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Receipt size={24} />
                      <span className="ms-2 text-white">Recipe</span>
                    </div>
                    <span className="text-white">
                      <a
                        className="text-orange-400 underline"
                        href="/payment-complete"
                      >
                        View recipe
                      </a>
                    </span>
                  </div>

                  <div className="mt-2 border-t border-gray-700 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Info size={24} />
                        <span className="ms-2 text-white">
                          Subscription Status
                        </span>
                      </div>
                      {subStatus === "ACTIVE" || "Active" ? (
                        <span className="text-green-400">{subStatus}</span>
                      ) : (
                        <span className="text-red-400">{subStatus}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Barcode size={24} />
                        <span className="ms-2 text-white">Subscription ID</span>
                      </div>
                      <span className="text-white">{subId}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <CreditCard size={24} />
                        <span className="ms-2 text-white">Next Payment</span>
                      </div>
                      <span className="text-white">{subNextPayment}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Euro size={24} />
                        <span className="ms-2 text-white">
                          Payment Value
                          <a className="text-orange-400 text-xs hover:underline cursor-pointer">
                            <button onClick={() => {
                              
                              if (window.confirm("Are you sure you want to cancel your subscription? The action is irreversible and takes effect immediately.")) {
                                cancelSub(subPaypalId, subId);
                              }

                            }}>/Cancel</button>
                          </a>
                        </span>
                      </div>
                      <span className="text-white">
                        {subValue}$
                        <span className="text-orange-400 text-xs">/month</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    ) : (
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
};

export default serviceInformation;
