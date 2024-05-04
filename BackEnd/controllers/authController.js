import User from "../models/user.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
 
  const { userName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const NewUser = new User({ userName, email, password: hashedPassword });
  try {
    await NewUser.save();
    console.log("user data saved");
    res.status(201).json({message: "user created successfully"})
  } catch (error) {
    next(error);
  }
};
