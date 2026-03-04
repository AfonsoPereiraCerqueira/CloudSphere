import React, { useEffect, useState } from 'react'
import { useCartStore, useAuthStore, useSubscriptionStore } from '../store/authStore'
import { motion } from "framer-motion";
import { formatDate } from "../utils/date";
import FloatingShape from "../components/FloatingShape";

const PaymentComplete = () => {

    const { getRecipe, recipe } = useCartStore();
    const { user } = useAuthStore();
    const { verifySubscription, subscription } = useSubscriptionStore();

    const [recipePaymentId, setRecipePaymentId] = useState("");
    const [recipeSubscriptionId, setRecipeSubscriptionId] = useState("");
    const [recipeStartDate, setRecipeStartDate] = useState("");
    const [recipeExpireAt, setRecipeExpireAt] = useState("");
    const [recipeNextPayment, setRecipeNextPayment] = useState("");
    const [recipePrice, setRecipePrice] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipeNumber, setRecipeNumber] = useState("")

  useEffect(() => {
    if (user) {
      verifySubscription(user._id);
    }
  }, [subscription]);

    useEffect(() => {
        if (subscription) {
          getRecipe(subscription.subscription.subId);
        }
    }, [subscription]);

    useEffect(() => {
        if (recipe) {
            setRecipePaymentId(recipe.recipePaymentId);
            setRecipeSubscriptionId(recipe.recipeSubscriptionId);
            setRecipeStartDate(formatDate(recipe.recipeStartDate));
            setRecipeExpireAt(formatDate(recipe.recipeExpireAt));
            setRecipeNextPayment(formatDate(recipe.recipeNextPayment));
            setRecipePrice(recipe.recipePrice);
            setRecipeName(recipe.recipeName);
            setRecipeNumber(recipe.recipeNumber)
        }
    }, [recipe]);

      return (
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
          >
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
              Payment Information
            </h2>

            <div className="space-y-6">
              <motion.div
                className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col">
                  <div className="border-b border-gray-700 mb-3">
                    <div className="flex justify-between">
                      <p className="text-gray-300">CloudSphere</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300">
                        CloudSphere VPS Services S.A.
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300">Rua Aval de Cima 128</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300">N. Contrib. 509876321</p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <p className="text-gray-300">Tel. 912345678</p>
                    </div>
                  </div>

                  <div className="border-b border-gray-700 mb-3">
                    <div className="flex justify-between">
                      <p className="text-gray-300">NIF: </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300">Nome:</p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <p className="text-gray-300">Morada:</p>
                    </div>
                  </div>

                  <div className="border-b border-gray-700 mb-3">
                    <div className="flex justify-between">
                      <p className="text-gray-300">
                        Fatura-recibo {recipeNumber}
                      </p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <p className="text-gray-300">{recipeStartDate}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-300">Payment ID: </p>
                    <p className="text-gray-300">{recipePaymentId}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Subscriber:</p>
                    <p className="text-gray-300">{recipeName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Price:</p>
                    <p className="text-gray-300">{recipePrice}$</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Tax:</p>
                    <p className="text-gray-300">23%</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Subscription ID:</p>
                    <p className="text-gray-300">{recipeSubscriptionId}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Starting Date:</p>
                    <p className="text-gray-300">{recipeStartDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Ending Date:</p>
                    <p className="text-gray-300">{recipeExpireAt}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-300">Next Payment:</p>
                    <p className="text-gray-300">{recipeNextPayment}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
                Thank you for trusting us!
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                              font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => window.print(0, 0, 0, 0)}
              >
                Print Receipt
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                              font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
                              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={() => window.location.replace("/clientArea")}
              >
                Go to Client Dashboard
              </motion.button>
            </motion.div>
            <p className="text-center text-gray-300 mt-5">
              The printout of the receipt serves as official proof of purchase
              of the service. If you encounter any issues, please contact
              support.
            </p>
          </motion.div>
        </div>
      );
}

export default PaymentComplete