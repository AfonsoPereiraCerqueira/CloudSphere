import { Timestamp } from "mongodb"
import moongose from "mongoose"
const supportContactSchema = new moongose.Schema(
  {
    UserId: {
      type: String,
      required: [true, "Please enter user ID."],
    },

    message: {
      type: String,
      required: [true, "Please enter user message."],
    },

    status: {
      type: String,
      required: false,
      default: "Pending",
    },

    employeeId: {
      type: String,
      required: false,
    },

    response: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const SupportContact = moongose.model("SupportContact", supportContactSchema);

export default SupportContact;
