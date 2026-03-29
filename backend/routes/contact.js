const router = require("express").Router();
const Contact = require("../models/Contact");

// GET
router.get("/", async (req, res) => {
  try {
    const data = await Contact.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;