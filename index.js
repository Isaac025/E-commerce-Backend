require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cloudinary = require("cloudinary").v2;

// middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "E-commerce  Api Running" });
});
//error route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

//save to db
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "e-commerce" });
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectToDB();
