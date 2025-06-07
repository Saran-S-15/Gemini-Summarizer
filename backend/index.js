import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

import connectDB from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import summaryRoutes from "./routes/summary.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT: ${PORT}`);
})