import Support from "../models/support_contact.model.js"

export const getSupportContacts = async (req, res) => {
  try {
    const supportContacts = await Support.find({});
    res.status(200).json(supportContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleSupportContact = async (req, res) => {
  try {
    const { id } = req.params;
    const supportContact = await Support.findById(id);

    if (!supportContact) {
      res.status(404).json({ message: "Support Contact Not Found" });
    }

    res.status(200).json(supportContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSupportContact = async (req, res) => {
  try {
    const supportContact = await Support.create(req.body);
    res.status(200).json(supportContact);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateSupportContact = async (req, res) => {
  try {
    const { id } = req.params;

    const supportContact = await Support.findByIdAndUpdate(id, req.body);

    if (!supportContact) {
      return res.status(404).json({ message: "Support Contact Not Found" });
    }

    const updatedSupportContact = await Support.findById(id);
    res.status(200).json(updatedSupportContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSupportContact = async (req, res) => {
  try {
    const { id } = req.params;
    const supportContact = await Support.findByIdAndDelete(id);

    if (!supportContact) {
      return res.status(404).json({ message: "Support Contact Not Found" });
    }

    res.status(200).json({ message: "Support Contact Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
