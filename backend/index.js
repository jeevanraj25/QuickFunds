import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./DB/db.js";
import cookieParser from "cookie-parser";
import UserRoute from "./routers/userRoute.js"
import TransactionsRoute from "./routers/transactionRoute.js"


dotenv.config({});
const PORT= 3000;

const app =express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}));
app.use(express.json());
app.use(cookieParser())




// api
app.use("/api/v1/user",UserRoute);
app.use("/api/v1/tarnsaction",TransactionsRoute);




app.listen(PORT ,() =>{
    connectDB();
    console.log(`server is running at ${PORT}`);
})