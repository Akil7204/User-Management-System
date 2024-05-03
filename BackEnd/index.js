import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js"

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use("/user", userRoutes);

app.listen(3000, () => {
    console.log("server running on port 3000");
});


