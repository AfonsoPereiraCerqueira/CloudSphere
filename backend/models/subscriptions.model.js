import { Timestamp } from "mongodb"
import moongose from "mongoose"

const subscriptionSchema = new moongose.Schema(
  {
    UserID: {
      type: String,
      required: [true, "Please enter userId"],
    },

    planId: {
      type: String,
      required: [true, "Please enter Plan ID"],
    },

    subId: {
      type: String,
      required: [true, "Please enter Subscription ID"],
    },

    startDate: {
      type: Date,
      required: [true, "Please enter the start date"],
    },

    expireAt: {
      type: Date,
      required: [true, "please enter the expire date"]
    },

    status: {
      type: String,
      required: [true, "Please enter the subscription status"]
    },

    paymentValue: {
      type: String,
      required: [true, "Please enter the payment value"]
    }

  },
  { timestamps: true }
);

const Subscription = moongose.model("Subscription", subscriptionSchema);

export default Subscription;
