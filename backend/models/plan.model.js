import { Timestamp } from "mongodb"
import moongose from "mongoose"

const planSchema = new moongose.Schema(
  {
    planName: {
      type: String,
      required: [true, "Please enter plan name"],
    },

    planPrice: {
      type: Number,
      required: [true, "Please enter Plan price"],
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Please enter plan description"],
    },
  },
  { timestamps: true }
);

const Plan = moongose.model("Plan", planSchema);

export default Plan;
