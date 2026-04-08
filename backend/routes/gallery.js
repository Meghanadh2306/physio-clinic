const router = require("express").Router();
const Gallery = require("../models/Gallery");
const upload = require("../middleware/upload"); // 🔥 IMPORTANT

// ================= GET =================
router.get("/", async (req, res) => {
  try {
    const data = await Gallery.find();
    // Add caching headers for better performance
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ADD (UPLOAD IMAGE) =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newImage = await Gallery.create({
      image: req.file.path,   // 🔥 Cloudinary URL
      category: req.body.category
    });

    res.json(newImage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;