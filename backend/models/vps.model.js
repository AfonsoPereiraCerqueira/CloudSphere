import { Timestamp } from "mongodb";
import moongose from "mongoose";

const vpsSchema = new moongose.Schema(
  {
      UserId: {
            type: String,
            required: [true, "Please enter user id"],
      },
      
      vpsName: {
            type: String,
            required: [true, "Please enter vps name"],
      },

      vpsIP: {
            type: String,
            required: [true, "Please enter vps IP"],
      },

      vpsPort: {
            type: String,
            required: [true, "Please enter vps port"],
      },

      vpsUsername: {
            type: String,
            required: [true, "Please enter vps username"],
      },

      vpsPassword: {
            type: String,
            required: [true, "Please enter vps password"],
      },

      vpsType: {
            type: String,
            required: [true, "Please enter vps type"],
      },

      vpsStatus: {
            type: String,
            required: [true, "Please enter vps status"],
      },

      vpsOS: {
            type: String,
            required: [true, "Please enter vps OS"],
      },

      vpsLocation: {
            type: String,
            required: [true, "Please enter vps location"],
      },
  }    
);

const VPS = moongose.model("VPS", vpsSchema);
export default VPS;