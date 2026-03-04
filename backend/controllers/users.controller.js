import User from "../models/users.model.js"


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUserByName = async (req, res) => {
  const { name } = req.body;


  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(501).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updatedUser = await User.findById(id);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*export default {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
   getSingleUserByName,
} */