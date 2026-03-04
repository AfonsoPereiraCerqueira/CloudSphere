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
import { useAdminStore, useDashboardStore, useAuthStore } from "../store/authStore";
import { use } from "react";

const DashboardUser = () => {
  const { employee } = useAdminStore();
  const { allUsers, getAllUsers, desactivateUser, activateUser, getSingleSubscriptionByUserId, singleSubscriptionFound, singleSubscription } = useDashboardStore();
  const { searchUserByName, searchedUser, checkUserActiveSubscription, UserFoundhaveSubscription } = useAuthStore();
  const [search, setSearch] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [userFoundData, setUserFoundData] = useState({});
  const [subscriptionData, setSubscriptionData] = useState({});
  const [searchAppear, setSearchAppear] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    searchUserByName(search);
  }, [search]);

  const handleSearch = () => {
    setSearchAppear(true);
    if (searchedUser) {
      setUserFound(true);
      setUserFoundData(searchedUser);
    } else {
      setUserFoundData({});
      setUserFound(false);
      setSearchAppear(false);
    }
  };

  useEffect(() => {
    if (userFoundData) {
      checkUserActiveSubscription(userFoundData._id);
      getSingleSubscriptionByUserId(userFoundData._id);
    }
  }, [userFoundData]);

  useEffect(() => {
    if (singleSubscriptionFound) {
      setSubscriptionData(singleSubscription);
    }
  }, [singleSubscriptionFound]);



  const deactivateUser = async (id, status) => {
    if (status === true) {
      const confirm = window.confirm("Are you sure you want to deactivate this user?");
      if (confirm) {
        await desactivateUser(id);
        window.location.reload();
      }
    } else {
      const confirm = window.confirm("Are you sure you want to activate this user?");
      if (confirm) {
        await activateUser(id);
        window.location.reload();
      }
    }
  }

  return (
    <>
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-6">Users List</h3>

        {/* User Search */}

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-2 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500
            focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200"
          />
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSearch()}>
            Search
          </button>
        </div>

        {/* User List */}
        <div className="overflow-y-scroll h-[calc(100vh-250px)] scroll-pb-20 pb-20">
          {searchAppear && (
            (userFound ? (
              <div className="border-b border-gray-700 pb-5 mt-5">
                <h3 className="text-3xl font-bold mb-6">User found</h3>

                <div className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{userFoundData.name}</h4>
                    <div>
                      <span className="ml-3 text-white">Id:</span>
                      <span className="text-gray-400"> {userFoundData._id}</span>
                    </div>
                    {
                      singleSubscriptionFound ? (
                        <div>
                          <span className="ml-3 text-white">Subscription:</span>
                          <span className="text-gray-400"> {subscriptionData._id}</span>
                        </div>
                      ) : (
                        <div>
                          <span className="ml-3 text-white">Subscription:</span>
                          <span className="text-gray-400"> No subscription</span>
                        </div>
                      )
                    }
                    <div>
                      <span className="ml-3 text-white">Email:</span>
                      <span className="text-gray-400"> {userFoundData.email}</span>
                    </div>
                    <div>
                      <span className="ml-3 text-white">Status:</span>
                      {
                        userFoundData.Status ? <span className="text-emerald-400"> Active</span> : <span className="text-red-400"> Inactive</span>
                      }
                    </div>
                    <div>
                      <span className="ml-3 text-white">Created At:</span>
                      <span className="text-gray-400"> {userFoundData.createdAt}</span>
                    </div>
                    <button
                      className="w-full text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                      onClick={() => deactivateUser(userFoundData._id, userFoundData.Status)}
                    >
                      {userFoundData.Status ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b border-gray-700 pb-10 mt-5">
                <h3 className="text-3xl font-bold mb-6">No user found</h3>
              </div>
            ))
          )}


          {allUsers.map((user, index) => (

            <div
              key={user._id}
              className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50"
            >
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">{user.name}</h4>
                <div>
                  <span className="ml-3 text-white">Id:</span>
                  <span className="text-gray-400"> {user._id}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Subscription:</span>
                  <span className="text-gray-400"> {user.Subscription}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Email:</span>
                  <span className="text-gray-400"> {user.email}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Status:</span>
                  {
                    user.Status ? <span className="text-emerald-400"> Active</span> : <span className="text-red-400"> Inactive</span>
                  }
                </div>
                <div>
                  <span className="ml-3 text-white">Created At:</span>
                  <span className="text-gray-400"> {user.createdAt}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    className="w-full text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={() => deactivateUser(user._id, user.Status)}
                  >
                    {user.Status ? "Deactivate" : "Activate"}
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

export default DashboardUser;
