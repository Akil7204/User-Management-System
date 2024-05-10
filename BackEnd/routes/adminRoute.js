import  express from "express";
import {addUser, adminDashboardData, adminLoginPost, deleteUser, editUser} from "../controllers/adminControllers.js";
const adminRouter = express.Router()

adminRouter.post('/login', adminLoginPost);
adminRouter.post('/getdashboarddata', adminDashboardData);
adminRouter.post('/edit/:id', editUser);
adminRouter.post('/add', addUser);
adminRouter.delete('/delete/:id', deleteUser)


export default adminRouter;