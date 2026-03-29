// routes/social.js
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    instagram: "https://www.instagram.com/sriphysioeluru?igsh=azhpZ2dtc2podjJ4",
    google: "https://share.google/D2d74ha7CjrMlLFfL",
    whatsapp: "https://wa.me/919493800475?text=Hello%20I%20want%20to%20book%20an%20appointment"
  });
});

module.exports = router;