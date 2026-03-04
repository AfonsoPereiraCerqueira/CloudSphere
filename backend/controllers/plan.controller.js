import Plan from "../models/plan.model.js"

export const getPlan = async (req, res) => {
  try {
    const plan = await Plan.find({});
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlanByName = async (req, res) => {
    try {
        const { planName } = req.body; 

        const plan = await Plan.findOne({ planName });

        if (!plan) {
            res.status(401).json({ message: "plan Not Found" });
        }

        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByIdAndUpdate(id, req.body);

    if (!plan) {
      return res.status(404).json({ message: "plan Not Found" });
    }

    const updatedplan = await Plan.findById(id);
    res.status(200).json(updatedplan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByIdAndDelete(id);
    
        if (!plan) {
          return res.status(404).json({ message: "plan Not Found" });
        }
    
        res.status(200).json(plan);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};