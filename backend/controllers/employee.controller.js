import Employee from "../models/employees.model.js"


export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});

    res.status(201).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      res.status(404).json({ message: "Employee Not Found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleEmployeeByName = async (req, res) => {
  const { name } = req.body;

  try {
    const employee = await Employee.findOne({ name });

    if (!employee) {
      return res.status(500).json({ message: "Employee Not Found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(id, req.body);

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    const updatedEmployee = await Employee.findById(id);

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};