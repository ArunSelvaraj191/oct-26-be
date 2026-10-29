const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.find({ email });
    if (userExist.length > 0) {
      return res
        .status(400)
        .json({ message: "User Already Exist!", userExist });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      username,
      email,
      password: hashedPassword,
    };
    const user = await User.insertOne(payload);
    res.json({ message: "User created successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Register Failed!", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    const checkPass = await bcrypt.compare(password, userExist.password);
    if (userExist.length == 0 || !checkPass) {
      return res.status(401).json({ message: "Email or Password not valid!" });
    } else {
      const JWT_SECRET = process.env.JWT_SECRET;
      const payload = {
        username: userExist.username,
        email: userExist.email,
      };
      const token = jwt.sign(payload, JWT_SECRET);
      return res.json({
        message: "Login successfully!",
        user: userExist,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Login Failed!", error: error.message });
  }
});

module.exports = router;
