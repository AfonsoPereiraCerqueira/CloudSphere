import Subscription from "../models/subscriptions.model.js"

export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.find({});
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubscriptionByName = async (req, res) => {
    try {
        const { name } = req.params; 
        const subscription = await Subscription.findOne({ name });

        if (!subscription) {
            res.status(404).json({ message: "subscription Not Found" });
        }

        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findByIdAndUpdate(id, req.body);

    if (!subscription) {
      return res.status(404).json({ message: "subscription Not Found" });
    }

    const updatedsubscription = await Subscription.findById(id);
    res.status(200).json(updatedsubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByIdAndDelete(id);
    
        if (!subscription) {
          return res.status(404).json({ message: "subscription Not Found" });
        }
    
        res.status(200).json(subscription);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

export const getSubscriptionByUserId = async (req, res) => {
  const { userId } = req.body;

  try { 
    
    const subscription = await Subscription.findOne({ UserID: userId });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
