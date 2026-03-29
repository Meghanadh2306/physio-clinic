const express = require("express");
const router = express.Router();
const About = require("../models/About");
const upload = require("../middleware/upload");

// ✅ GET About
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD / UPDATE About (CLOUDINARY FIXED)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    // ✅ CLOUDINARY IMAGE FIX
    if (req.file) {
      data.image = req.file.path || req.file.secure_url;
    }

    // ✅ FIX: points parsing
    if (data.points) {
      try {
        data.points = JSON.parse(data.points);
      } catch {
        data.points = data.points.split(","); // fallback
      }
    }

    let about = await About.findOne();

    if (about) {
      about = await About.findOneAndUpdate({}, data, { new: true });
    } else {
      about = new About(data);
      await about.save();
    }

    res.json(about);

  } catch (err) {
    console.log("ABOUT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;