const router = require("express").Router();
const Service = require("../models/Service");

// GET all
router.get("/", async (req, res) => {
  try {
    const data = await Service.find();
    // Add caching headers for better performance
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD
router.post("/", async (req, res) => {
  const newService = await Service.create(req.body);
  res.json(newService);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;