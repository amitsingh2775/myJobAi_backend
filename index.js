import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/prodcutRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://products-eight-dun.vercel.app', // Your frontend domain
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

// 🟢 Connect DB and export app
await ConnectDB();

// // 🔁 Optional: run locally with app.listen()
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

export default app;
