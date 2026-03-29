const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const SECRET = "mysecretkey"; // later move to .env

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1d" });

  res.json({ token });
});

module.exports = router;