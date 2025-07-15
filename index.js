import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/prodcutRoutes.js";
import cors from "cors";
// import https from "https";
// import fs from "fs";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://products-eight-dun.vercel.app'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes); 

const PORT = process.env.PORT || 5000;



app.listen(PORT, async () => {
  console.log(`Server Started at http://localhost:${PORT}`);
  await ConnectDB();
});