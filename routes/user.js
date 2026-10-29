const router = require("express").Router();
const User = require("../models/userSchema");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "User fetched successfully!", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User fetching Failed!", error: error.message });
  }
});

module.exports = router;
