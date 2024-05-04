import User from "../models/user.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const NewUser = new User({ userName, email, password: hashedPassword });
    await NewUser.save();
  } catch (error) {
    next(error)
  }
};
