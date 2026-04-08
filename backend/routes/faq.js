const router = require("express").Router();
const Faq = require("../models/Faq");


// ✅ GET all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find();
    // Add caching headers for better performance
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADD FAQ
router.post("/", async (req, res) => {
  const newFaq = new Faq(req.body);
  await newFaq.save();
  res.json(newFaq);
});


// ✅ DELETE FAQ
router.delete("/:id", async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;