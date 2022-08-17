const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  console.log("route home");
  try {
    axios
      .get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
      .then((response) => {
        const home = response.data;
        res.status(200).json(home);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "catch from home router" });
  }
});

module.exports = router;
