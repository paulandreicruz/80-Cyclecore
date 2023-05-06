import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan";
import categoryRoutes from "./routes/category.js";
import brandRoutes from "./routes/brand.js";
import subcategoryRoutes from "./routes/subcategory.js";
import productRoutes from "./routes/product.js";
import bikeRoutes from "./routes/bikeroutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

//cloudinary
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

//DATABASE CONNECTION

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("DB ERROR => ", err));

//MIDDLEWARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//router middleware

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", brandRoutes);
app.use("/api", productRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", bikeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
