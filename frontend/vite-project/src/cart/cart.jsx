import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore, useCartStore } from "../store/authStore";
import {
  Heart,
  BadgePercent,
  CircleX,
  CircleUser,
  Pin,
  Map,
  MapPinned,
} from "lucide-react";
import Input from "../components/Input";
import FloatingShape from "../components/FloatingShape";
import Footer from "../components/footer";
import toast from "react-hot-toast";
import PaypalButtonsComponent from "../cart/PaypalButtonsComponent";

const cart = () => {
  const { user, haveSubscription } = useAuthStore();
  const { getCart, planInfo, removeFromCart, descountCode, descount } = useCartStore();

  const [planName, setPlanName] = useState("");
  const [planDesc, setPlanDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalNoTax, setTotalNoTax] = useState(0);
  const [descountValue, setDescountValue] = useState(0);
  const [descountCodeInput, setDescountCodeInput] = useState("");
  const [descountBool, setDescountBool] = useState(false);
  const [proceedCheckout, setProceedCheckout] = useState(false);
  const [planId, setPlanId] = useState("");

  useEffect(() => {
    getCart(user._id);
  }, [getCart]);

  useEffect(() => {
    if (planInfo) {
      setPlanId(planInfo._id);
      setTax((planInfo.planPrice * 0.13).toFixed(2));
      setPrice(planInfo.planPrice.toFixed(2));
      setPlanName(planInfo.planName);
      setPlanDesc(planInfo.description);
    }
  }, [planInfo]);

  useEffect(() => {
    setTotal(Number(price) + Number(tax));
    setTotalNoTax(Number(price));
  }, [price, tax]);

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    removeFromCart(user._id, planInfo._id);

    window.location.reload();
  };

  const roundFloorToTwoDigits = (num) => {
    return Math.floor(num * 100) / 100;
  }

  const handleDescount = (e) => {
    e.preventDefault();

    if (descountBool) {
      toast.error("You already used a descount code");
    } else {
      setDescountValue(
        descountCode(descountCodeInput).then((res) => {
          setDescountValue(res);
          setTotal(roundFloorToTwoDigits(Number(total) - (Number(total) * Number(res))));
          setTotalNoTax(Number(totalNoTax) - (Number(totalNoTax) * Number(res)).toFixed(2));
          setDescountBool(true);
          return res;
        })
      );
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
            from-gray-900 via-orange-800 to-red-900 relative overflow-hidden"
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
          className="m-40 mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
        >
          <section className="py-5 antialiased md:py-10">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
                Shopping Cart
              </h2>

              {planInfo ? (
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="m-20 mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800   "
                      >
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold  text-white">
                              ${price}{" "}
                              <span className="text-neutral-400 tracking-tight text-xs">
                                /Month
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <p className="text-gray-300 font-bold">
                            {planName}
                            <p className="text-sm font-normal text-gray-500">
                              {planDesc}
                            </p>
                          </p>

                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleRemoveFromCart}
                              className="w-1/2 mt-2 mb-5 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
				 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                              Remove from Cart
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      {proceedCheckout ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="m-20 mt-10 p-8 bg-white backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800   "
                        >
                          <p className="text-xl font-semibold  text-black">
                            Checkout
                          </p>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-black">
                                  Total price
                                </dt>
                                <dd className="text-base font-bold text-black">
                                  ${total}
                                </dd>
                              </dl>
                            </div>
                            <PaypalButtonsComponent planName={planName} duration="month" price={totalNoTax} planId={planId}/>
                          </div>
                        </motion.div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800   "
                  >
                    <p className="text-xl font-semibold  text-white">
                      Order summary
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Original price
                          </dt>
                          <dd className="text-base font-medium  text-white">
                            ${price}
                          </dd>
                        </dl>

                        {descountBool ? (
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Descount
                            </dt>
                            <dd className="text-base font-medium  text-emerald-500">
                              {descountValue * 100}%
                            </dd>
                          </dl>
                        ) : (
                          <></>
                        )}

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Tax
                          </dt>
                          <dd className="text-base font-medium  text-white">
                            ${tax}
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                        <dt className="text-base font-bold  text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold  text-white">
                          ${total}
                        </dd>
                      </dl>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setProceedCheckout(true)}
                      className="w-full mt-2 mb-5 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
				 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      Proceed to Checkout
                    </motion.button>

                    <div className="space-y-4">
                      <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium  text-white"
                      >
                        {" "}
                        Do you have a voucher or gift card?{" "}
                      </label>
                      <Input
                        icon={BadgePercent}
                        type="text"
                        placeholder="Code"
                        value={descountCodeInput}
                        onChange={(e) => setDescountCodeInput(e.target.value)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDescount}
                        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
				 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        Apply Code
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ) : (haveSubscription ? (
                
                <p className="text-lg font-bold text-white text-center">
                  You already have a subscription
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 w-30 py-2 px-3 bg-gradient-to-r from-orange-500 to-red-600 text-white 
                                    font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700 
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <a href="/clientArea">Dashboard</a>
                  </motion.button>
                </p>
              ) : (
                  <p className="text-lg font-bold text-white text-center">
                  Uh Oh... Your cart is empty...
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 w-30 py-2 px-3 bg-gradient-to-r from-orange-500 to-red-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700
				 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <a href="/plans">See Plans</a>
                  </motion.button>
                </p>

              ))}
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default cart;
