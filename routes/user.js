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
router.put("/", async (req, res) => {
  try {
    console.log("req =>", req.body);
    const { id, username } = req.body;
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true },
    );
    console.log("userUpdate ::", userUpdate);
    res.json({ message: "User updated successfully!", userUpdate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User fetching Failed!", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("req =>", req.params.id);
    const id = req.params.id;
    const userDelete = await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully!", userDelete });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User fetching Failed!", error: error.message });
  }
});

module.exports = router;
