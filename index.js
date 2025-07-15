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
  origin: 'https://products-eight-dun.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes); 

const PORT = process.env.PORT || 5000;



app.listen(PORT, async () => {
  console.log(`Server Started at http://localhost:${PORT}`);
  await ConnectDB();
});
