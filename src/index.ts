// src/index.ts
import express from "express";
import connectDB from "./config/db";
const app = express();
const port = 3000;

//connect to MONGODB
connectDB;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
