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

        res
        .cookie("access_token", token, { httpOnly: true, expires: expirayDate })
        .status(200)
        .json(token);
      } else {
        return next(errorHandler(404, "User not found"));
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  };