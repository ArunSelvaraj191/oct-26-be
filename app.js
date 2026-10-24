// import Name from 'library_name'
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const paymentRoute = require("./routes/payment");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use("/auth", authRoute);
app.use("/payment", paymentRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Node js with Express js");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Mongodb Connected!");
  })
  .catch((error) => {
    console.log("Mongodb Error", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
