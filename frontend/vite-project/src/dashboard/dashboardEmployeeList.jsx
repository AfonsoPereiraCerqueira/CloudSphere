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
import { useAdminStore, useDashboardStore } from "../store/authStore";

const DashboardEmployeeList = () => {
  const { employee } = useAdminStore();
  const { allEmployees, getAllEmployees, desactivateEmployee, activateEmployee, searchEmployeeByName, searchedEmployee } = useDashboardStore();
  const [search, setSearch] = useState("");
  const [searchAppear, setSearchAppear] = useState(false);
  const [employeeFound, setEmployeeFound] = useState(false);
  const [employeeFoundData, setEmployeeFoundData] = useState({});
  
  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  useEffect(() => {
    searchEmployeeByName(search);
  }, [search]);

  const handleSearch = () => {
    setSearchAppear(true);
    if (searchedEmployee) {
      setEmployeeFound(true);
      setEmployeeFoundData(searchedEmployee);
    } else {
      setEmployeeFoundData({});
      setEmployeeFound(false);
      setSearchAppear(false);
    }
  };

  const deactivateEmployee = async (id, status) => {
    if (status === true) {
      const confirm = window.confirm("Are you sure you want to deactivate this employee?");
      if (confirm) {
        await desactivateEmployee(id);
        window.location.reload();
      }
    } else {
      const confirm = window.confirm("Are you sure you want to activate this employee?");
      if (confirm) {
        await activateEmployee(id);
        window.location.reload();
      }
    }
  }

  return (
    <>
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-6">Employees List</h3>

        {/* Employee Search */}

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Employees..."
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
            (employeeFound ? (
              <div className="border-b border-gray-700 pb-10 mt-5">
                <h3 className="text-3xl font-bold mb-6">User found</h3>

                <div className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{employeeFoundData.name}</h4>
                    <div>
                      <span className="ml-3 text-white">Id:</span>
                      <span className="text-gray-400"> {employeeFoundData._id}</span>
                    </div>
                    <div>
                      <span className="ml-3 text-white">Email:</span>
                      <span className="text-gray-400"> {employeeFoundData.email}</span>
                    </div>
                    <div>
                      <span className="ml-3 text-white">Role:</span>
                      <span className="text-gray-400"> {employeeFoundData.role}</span>
                    </div>
                    <div>
                      <span className="ml-3 text-white">Status:</span>
                      {
                        employeeFoundData.Status ? <span className="text-emerald-400"> Active</span> : <span className="text-red-400"> Inactive</span>
                      }
                    </div>
                    <div>
                      <span className="ml-3 text-white">Created At:</span>
                      <span className="text-gray-400"> {employeeFoundData.createdAt}</span>
                    </div>
                    <button
                      className="w-full text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                      onClick={() => deactivateUser(employeeFoundData._id, employeeFoundData.Status)}
                    >
                      {employeeFoundData.Status ? "De-activate" : "Activate"}
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

          {allEmployees.map((employees, index) => (
            <div
              key={employees._id}
              className="flex items-center justify-between border border-gray-700 rounded-xl p-2 mt-5 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-50"
            >
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">{employees.name}</h4>
                <div>
                  <span className="ml-3 text-white">Id:</span>
                  <span className="text-gray-400"> {employees._id}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Email:</span>
                  <span className="text-gray-400"> {employees.email}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Role:</span>
                  <span className="text-gray-400"> {employees.role}</span>
                </div>
                <div>
                  <span className="ml-3 text-white">Status:</span>
                  {
                    employees.Status ? <span className="text-emerald-400"> Active</span> : <span className="text-red-400"> Inactive</span>
                  }
                </div>
                <div>
                  <span className="ml-3 text-white">Created At:</span>
                  <span className="text-gray-400"> {employees.createdAt}</span>
                </div>
                <div className="flex gap-3">
                <button
                    className="w-full text-center mt-5 w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={() => deactivateEmployee(employees._id, employees.Status)}
                  >
                    {employees.Status ? "De-activate" : "Activate"}
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

export default DashboardEmployeeList;
