import React, { useEffect } from "react";
import { PricingOptions } from "../constants/constants";
import { useAuthStore, useCartStore } from "../store/authStore";
import toast from "react-hot-toast";

const Pricing = () => {

  const { user, haveSubscription } = useAuthStore();
  const { addToCart, getCart } = useCartStore();

  useEffect(() => {
    if (user) {
      getCart(user._id);
    }
  }, [getCart]);

  const handleAddToCart = (plan) => {
    try {
      if (haveSubscription === true) {
        toast.error("You already have a subscription");
        return;
      }

      if (!user) {
        toast.error("You have to be logged in to add to cart");
        return;
      }

      if (user && !haveSubscription) {
        addToCart(user._id, plan);
      }

    } catch (error) {
      toast.error("You have to be logged in to add to cart");
      console.log(error);
    }
  }

  return (
    <div id="pricing" className="mt-20 m-20">
      <h2 className="text-4xl sm:text-3xl lg:text-6xl text-center my-8 tracking-wider">
        Pricing
      </h2>
      <div className="flex flex-wrap">
        {PricingOptions.map((option, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Pro Plan" && (
                  <span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Most Popular)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span className="text-neutral-400 tracking-tight">/Month</span>
              </p>
              <ul>
                {option.features.map((feature, index) => [
                  <li key={index} className="mt-8 flex items-center">
                    -
                    <span className="ml-2">{feature}</span>
                  </li>,
                ])}
              </ul>
              <a
                href="#"
                onClick={() => handleAddToCart(option.title)}
                className="flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-gradient-to-r from-orange-500 to-orange-800 border border-orange-900 rounded-lg hover:scale-105 transition duration-200"
              >
                Add to Cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
