import { useState, useEffect } from "react";
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
import { useAdminStore, useDashboardStore, useSubscriptionStore } from "../store/authStore";

const DashboardSubscriptions = () => {
  const { allSubscriptions, getAllSubscriptions, getSingleSubscriptionByUserId, singleSubscriptionFound, singleSubscription } = useDashboardStore();
  const { cancelSub } = useSubscriptionStore();

  const [search, setSearch] = useState("");
  const [subscriptionFoundBoolean, setSubscriptionFoundBoolean] = useState(false)
  const [subscriptionDataFound, setSubscriptionDataFound] = useState({})
  const [searchAppear, setSearchAppear] = useState(false)

  useEffect(() => {
    getSingleSubscriptionByUserId(search)
  }, [search])

  const handleSearch = () => {
    setSearchAppear(true)
    if (singleSubscription) {
      setSubscriptionFoundBoolean(true)
      setSubscriptionDataFound(singleSubscription)
    } else {
      setSubscriptionFoundBoolean(false)
      setSubscriptionDataFound({})
      setSearchAppear(false)
    }
  };


  useEffect(() => {
    getAllSubscriptions();
  }, [allSubscriptions]);

  return (
    <>
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-6">Subscriptions List</h3>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Subscriptions (User ID)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-2 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500
            focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSearch()}>
            Search
          </button>
        </div>

        {/* Employee List */}
        <div className="overflow-y-scroll h-[calc(100vh-250px)] scroll-pb-20 pb-20">
        {searchAppear && (
          (subscriptionFoundBoolean && (
            <div className="border-b border-gray-700 pb-5 mt-5">
            <h3 className="text-3xl font-bold mb-6">Subscription found</h3>
  
            <div className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50">
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">{subscriptionDataFound._id}</h4>
                <div>
                  <span className="ml-3 text-white">User ID:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.UserID}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">STATUS:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.status}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Start Date:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.createdAt}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Next Payment:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.expireAt}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Payment Value:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.paymentValue}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Plan ID:</span>
                  <span className="text-gray-400"> {subscriptionDataFound.planId}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Subscription ID (Paypal):</span>
                  <span className="text-gray-400"> {subscriptionDataFound.subId}</span>
                </div>
                <button className="w-auto text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={() => {

                      if (window.confirm("Are you sure you want to cancel this subscription?")) {
                        cancelSub(subscriptionDataFound.subId, subscriptionDataFound._id);
                        window.alert("Subscription Canceled");
                      }

                    }}
                  >
                    Cancel Subscription
                  </button>
            </div>
          </div>
          </div>
          ) || (
              <div className="border-b border-gray-700 pb-10 mt-5">
                <h3 className="text-3xl font-bold mb-6">No subscription found</h3>
              </div>

            )
          ) || (null)
        )}
          {allSubscriptions.map((subscriptions, index) => (
            <div
              key={index._id}
              className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50"
            >
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">{subscriptions._id}</h4>
                <div>
                  <span className="ml-3 text-white">User ID:</span>
                  <span className="text-gray-400"> {subscriptions.UserID}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">STATUS:</span>
                  <span className="text-gray-400"> {subscriptions.status}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Start Date:</span>
                  <span className="text-gray-400"> {subscriptions.createdAt}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Next Payment:</span>
                  <span className="text-gray-400"> {subscriptions.expireAt}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Payment Value:</span>
                  <span className="text-gray-400"> {subscriptions.paymentValue}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Plan ID:</span>
                  <span className="text-gray-400"> {subscriptions.planId}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Subscription ID (Paypal):</span>
                  <span className="text-gray-400"> {subscriptions.subId}</span>
                </div>
                <div className="flex gap-3">
                  <button className="w-auto text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={() => {

                      if (window.confirm("Are you sure you want to cancel this subscription?")) {
                        cancelSub(subscriptions.subId, subscriptions._id);
                        window.alert("Subscription Canceled");
                      }

                    }}
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          )) || <Loader />}
        </div>
      </div>
    </>
  );
};

export default DashboardSubscriptions;
