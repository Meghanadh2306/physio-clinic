const router = require("express").Router();
const Service = require("../models/Service");

// GET all
router.get("/", async (req, res) => {
  const data = await Service.find();
  res.json(data);
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