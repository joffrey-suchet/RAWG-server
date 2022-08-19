const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  console.log("route home");
  try {
    const parent_platform = req.query.parent_platforms
      ? req.query.parent_platforms
      : "1,2,3,5,7";
    const genres = req.query.genres
      ? req.query.genres
      : "1,2,3,4,5,6,7,8,9,10,12,13,14,15";
    axios
      .get(
        `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.search}&parent_platforms=${parent_platform}&genres=${genres}&page=${req.query.page}`
      )
      .then((response) => {
        const home = response.data;
        res.status(200).json(home);
      })
      .catch((error) => {
        console.log("catch from axios request", error);
      });
  } catch (error) {
    res.json({ message: "catch from home router" });
  }
});

module.exports = router;
