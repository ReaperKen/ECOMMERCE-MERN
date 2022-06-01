import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.route.js";
import UserRoutes from "./routes/user.route.js";
import ProductRoutes from "./routes/product.route.js";
import fileupload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();
//DATABASE

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    throw error;
  }
};
connect();
mongoose.connection.on("disconnected", () => console.log("Disconnected"));
mongoose.connection.on("connected", () => console.log("Connected"));

//Cloudinary

cloudinary.config({
  cloud_name: process.env.CNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export async function fileUpload(filepath) {
  return await cloudinary.uploader.upload(filepath, {
    folder: "profiles",
  });
}

//MIDDLEWARES

app.use(cookieParser());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./src/uploads/",
  })
);

//ROUTES

app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

//ERROR HANDLER
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMSG = error.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMSG,
  });
});

app.get("/", (req, res, next) => {
  res.json({ state: "OK" });
});
const port = process.env.PORT;
app.listen(port, console.log("server on"));
