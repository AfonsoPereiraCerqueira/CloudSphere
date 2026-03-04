import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useCartStore, useAuthStore, useVPSStore } from "../store/authStore";

const PaypalButtonsComponent = ({ planName, duration, price, planId }) => {

  const { paymentComplete, removeFromCart } = useCartStore();
  const { user } = useAuthStore();
  const { createVPS } = useVPSStore();

  const handleCreateSubscription = async () => {
    const response = await axios.post(`http://localhost:5000/api/pay`, {
      plan_name: planName,
      duration: duration,
      price: price,
    });

    const data = response.data;

    if (data.paypalSubscriptionId) {
      return data.paypalSubscriptionId.id;
    }
  };

  const handleApprove = async (data) => {
    if (data.orderID) {
      const response = await axios({
        url: "http://localhost:5000/api/pay/save-payment",
        method: "POST",
        data: data,
      });

      const jsonData = response.data;
      console.log({ jsonData });
      await paymentComplete(jsonData, user._id, user.name);
      await createVPS(user._id)
      await removeFromCart(user._id, planId);

      window.location.href = "/payment-complete";
    }
  };

  return (
    <div className="bg-transparent border-none">
      <PayPalButtons
        style={{
          shape: "pill",
          color: "blue",
          layout: "vertical",
        }}
        createSubscription={handleCreateSubscription}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default PaypalButtonsComponent;
