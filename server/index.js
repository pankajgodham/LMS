import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import courceRoute from "./routes/cource.route.js";
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCource.route.js"
import courceProgressRoute from "./routes/courceProgress.route.js"
dotenv.config({})
connectDB();
const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use('/api/v1/media',mediaRoute)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/cource",courceRoute)
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/",courceProgressRoute)
app.listen( PORT,()=>{
    console.log(`server run on port no ${PORT}`);
    
})