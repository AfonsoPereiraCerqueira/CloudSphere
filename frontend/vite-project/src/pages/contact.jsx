import React, { useState, forwardRef, useEffect } from "react";
import {
  Field,
  Label,
  Switch,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import FloatingShape from "../components/FloatingShape";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

import axios from "axios";
import Footer from "../components/footer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Contact = () => {
  const { user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/support/create", {
        UserId: user._id,
        message,
      });
      if (response.status === 200) {
        toast.success("A support message has been sent, we will get back to you soon.");
      }
    } catch (error) {
      toast.error("Error sending message");
      console.log(error);
    }
  }


  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
    from-gray-900 via-orange-800 to-red-900 flex items-center justify-center relative overflow-hidden"
      >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
              Support Contact
            </h2>

            <form onSubmit={handleSubmit}>
              <Input
                icon={Mail}
                type="email"
                placeholder={user.email}
               value={user.email}
               onChange={(e) => setEmail(e.target.value)}
              />
              <TextArea
                icon={Lock}
                type="text"
                placeholder="Describe your problem or question."
               value={message}
               onChange={(e) => setMessage(e.target.value)}
              />
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg shadow-lg hover:from-orange-600
          hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
              >
                Contact
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
