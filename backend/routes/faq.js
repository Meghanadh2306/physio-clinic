const router = require("express").Router();
const Faq = require("../models/Faq");


// ✅ GET all FAQs
router.get("/", async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
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