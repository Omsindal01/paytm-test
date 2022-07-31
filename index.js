import express from "express";
// const bodyParser = require("body-parser");
// const express = require("express");
// const cors = require("cors");
import { op } from "./paytmTest.js";
import { op1 } from "./PaytmVerify.js";
import bodyParser from "body-parser";
import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import postRoutes from "./routes/posts.js";
// import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/genToken", op);
app.use("/verifyToken", op1);

// app.use("/posts", postRoutes);
// app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});
const port = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() =>
//     app.listen(port, () => console.log(`server running on port ${port}`))
//   )
//   .catch((err) => console.log(err.message));
app.listen(port, () => console.log(`server running on port ${port}`));
