const router = require("express").Router();
const Certificate = require("../models/Certificate");
const upload = require("../middleware/upload");

// GET
router.get("/", async (req, res) => {
  const data = await Certificate.find();
  res.json(data);
});

// POST
router.post("/", upload.single("image"), async (req, res) => {
  const newCert = await Certificate.create({
    image: req.file.path,
    title: req.body.title
  });

  res.json(newCert);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;