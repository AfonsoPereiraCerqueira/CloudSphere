import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import FloatingShape from "../components/FloatingShape";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

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
              Welcome Back
            </h2>

            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center mb-6">
                <a href="/forgot-password" className="text-sm text-orange-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              {error && <p className="text-red-500 text-semibold mb-2">{error}</p>}

              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg shadow-lg hover:from-orange-600
            hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
              >
                {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
              </motion.button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-orange-500 hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
