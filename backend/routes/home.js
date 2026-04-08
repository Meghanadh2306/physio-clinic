const router = require("express").Router();
const Home = require("../models/Home");
const upload = require("../middleware/upload");

// GET
router.get("/", async (req, res) => {
  try {
    const data = await Home.findOne();
    // Add caching headers for better performance
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(data);
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST
router.post("/", upload.single("image"), async (req, res) => {
  const existing = await Home.findOne();

  const data = {
    title: req.body.title,
  phone: req.body.phone,
  subtitles: JSON.parse(req.body.subtitles || "[]"),
  doctorName: req.body.doctorName,
  doctorRole: req.body.doctorRole,
  };

  if (req.file) {
    data.image = req.file.path;
  }

  if (existing) {
    await Home.updateOne({}, data);
  } else {
    await Home.create(data);
  }

  res.send("Saved");
});

module.exports = router;