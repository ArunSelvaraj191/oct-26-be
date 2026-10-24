const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    console.log("req from FE React js", req.body);
    const { username, email, password } = req.body;
    const userExist = await User.find({ email });
    console.log("userExist ::", userExist);
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
    console.log("req from FE React js", req.body);
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    // console.log("userExist ::", userExist.password,password);
    const checkPass = await bcrypt.compare(password, userExist.password);
    console.log("checkPass :::", checkPass);
    if (userExist.length == 0 || !checkPass) {
      return res.status(401).json({ message: "Email or Password not valid!" });
    } else {
      return res.json({ message: "Login successfully!", user: userExist });
    }
  } catch (error) {
    res.status(500).json({ message: "Login Failed!", error: error.message });
  }
});

module.exports = router;
