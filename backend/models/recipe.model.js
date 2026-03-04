import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {

      userId: {
      type: String,
      required: [true, "Please enter user id"],
      },

      subId: {
        type: String,
        required: [true, "Please enter subscription id"],
      },

      recipeNumber: {
        type: String,
        required: [true, "Please enter recipe Number"],
      },

    recipeName: {
      type: String,
      required: [true, "Please enter recipe name"],
    },

    recipePrice: {
      type: Number,
      required: [true, "Please enter recipe price"],
      default: 0,
    },

    recipePaymentId: {
      type: String,
      required: [true, "Please enter recipe payment id"],
    },

    recipeSubscriptionId: {
      type: String,
      required: [true, "Please enter recipe subscription id"],
    },

    recipeStartDate: {
      type: Date,
      required: [true, "Please enter recipe start date"],
    },

    recipeExpireAt: {
      type: Date,
      required: [true, "Please enter recipe expire date"],
    },

    recipeNextPayment: {
      type: Date,
      required: [true, "Please enter recipe next payment"],
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;