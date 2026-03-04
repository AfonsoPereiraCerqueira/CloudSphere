import { Timestamp } from "mongodb"
import moongose from "mongoose"

const userSchema = new moongose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter user name"],
        },

        email: {
            type: String,
            required: [true, "Please enter user email"],
        },

        password: {
            type: String,
            required: [true, "Please enter user password"],
        },

        phone: {
            type: String,
            required: false,
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        Status: {
            type: Boolean,
            default: true
        },
        Subscription: {
            type: String,
            required: false,
            default: "No Subscription",
            
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    { timestamps: true }
);

const User = moongose.model("User", userSchema);

export default User