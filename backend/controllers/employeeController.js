const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee stored successfully",
      employee
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department } = req.query;

    const employees = await Employee.find({
      department: { $regex: department, $options: "i" }
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Employee updated successfully",
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee removed successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};