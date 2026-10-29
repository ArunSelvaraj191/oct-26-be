// import Name from 'library_name'
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const User = require("./models/userSchema");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET;

  console.log("Token ::", token);
  const verify = await jwt.verify(token, JWT_SECRET);
  console.log("verify =>", verify);
  const { email } = verify;
  const userExist = await User.findOne({ email });
  if (userExist.length == 0) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

app.use("/auth", authRoute);
app.use("/users", authMiddleware, userRoute);

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
