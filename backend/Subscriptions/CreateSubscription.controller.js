import Subscription from "../models/subscriptions.model.js"
import User from "../models/users.model.js"

export const createSubscriptionPaymentComplete = async (req, res) => {
    const { UserID, planId, subId, startDate, expireAt, status, paymentValue } = req.body;

    try {
        const subscription = await Subscription.create({ UserID, planId, subId, startDate, expireAt, status, paymentValue });

        const user = await User.findById(UserID);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        };

        user.Subscription = subscription._id;
        await user.save()
        
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const verifyIfUserHaveActiveSubscription = async (req, res) => {
    const { UserID } = req.body;

    try {
        const user = await User.findById(UserID);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        };

        const subscription = await Subscription.findOne({ UserID: user._id, status: "ACTIVE" });
        if (!subscription) {
            return res.status(401).json({ message: "User don't have active subscription" });
        };

        res.status(201).json({ success: true, subscription });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const manageSubscriptionsStatus = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        if (!subscriptions) {
            return res.status(401).json({ message: "Subscriptions not found" });
        };

        const currentDate = new Date()

        subscriptions.forEach(async (subscription) => {
            const expireDate = new Date(subscription.expireAt);

            if (expireDate.getTime() < currentDate.getTime()) {
              subscription.status = "INACTIVE";
              await subscription.save();
            }
        });

        res.status(201).json({ success: true, subscriptions });
    } 
    catch (error) {
        return res.status(500).send({ message: error.message});
    };
}

export const cancelSubscriptionDB = async (req, res) => {
    const { subscriptionID } = req.body;

    try {
        console.log("subscriptionID", subscriptionID);
        const subscription = await Subscription.findById(subscriptionID);
        if (!subscription) {
            return res.status(401).json({ message: "Subscription not found" });
        };

        const user = await User.findById(subscription.UserID);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        };

        user.Subscription = "No Subscription";
        await user.save()

        await Subscription.findByIdAndDelete(subscriptionID);

        
        res.status(201).json({ success: true, message: "Subscription removed successfully"});
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}