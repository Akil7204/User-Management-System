import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'Api is working'
    });
}

// update user;

export const updateUser = async (req, res, next) => {
    console.log(req.user.id);
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'you can update only your account'))
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            }, {new: true}
        );
        const {password, ...rest} = updateUser._doc;

        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }

}