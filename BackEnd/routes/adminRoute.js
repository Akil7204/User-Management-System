import  express from "express";
import {adminLoginPost} from "../controllers/adminControllers.js";
const adminRouter = express.Router()

adminRouter.post('/login', adminLoginPost)


export default adminRouter;