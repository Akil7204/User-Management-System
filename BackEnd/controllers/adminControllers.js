import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const adminLoginPost = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const emailMatch = email === process.env.ADMIN_EMAIL;
    const passMatch = password === process.env.ADMIN_PASS;

    if (emailMatch && passMatch) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      const expirayDate = new Date(Date.now() + 3600000); //1 hour
      const admin = req.body
      res
        .cookie("access_token", token, { httpOnly: true, expires: expirayDate })
        .status(200)
        .json(admin);
    } else {
      return next(errorHandler(404, "User not found"));
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const adminDashboardData = async (req, res) => {
  try {
    // Retrieve data from MongoDB using Mongoose
    const dashboardData = await User.find({});

    res.status(200).send({ success: true, dashboardData });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to fetch data from db" });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email } = req.body;
    console.log(req.params);
    // Update the user using findOneAndUpdate
    const updatedUser = await User.findByIdAndUpdate(id, { userName, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "An error occurred while updating user" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(208).json({ success: false, message: 'User already exists with this email' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

 export const deleteUser =  async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming `id` is the ObjectId of the user in MongoDB
    await User.findByIdAndDelete(id);

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Failed to delete user" });
  }
}

