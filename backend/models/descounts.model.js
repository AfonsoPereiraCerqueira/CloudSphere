import mongoose from "mongoose";
import { Timestamp } from "mongodb";

const descountSchema = new mongoose.Schema(
  {
    descountName: {
      type: String,
      required: [true, "Please enter descount name"],
    },

    descountPercentage: {
      type: Number,
      required: [true, "Please enter descount percentage"],
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Please enter descount description"],
    },
  },
  { timestamps: true }
);

const Descount = mongoose.model("Descount", descountSchema);

export default Descount;
