import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.set(express.urlencoded({ extended: true }));

// Db connection
connectDB();

app.use("/", userRoutes);

app.listen(8080, () => console.log("App listenin on port 8080"));
