const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const placeId = process.env.PLACE_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data.result.reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;