import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/dbconnect.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"
import aiRoute from "./routes/ai.route.js";

dotenv.config({});
connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://coursedesk11.netlify.app/', 
    credentials: true,
}));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/ai", aiRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})