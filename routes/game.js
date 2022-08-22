const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/game/:id", async (req, res) => {
  console.log("route game details");
  try {
    axios
      .get(
        `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY}`
      )
      .then((response) => {
        const home = response.data;
        res.status(200).json(home);
      })
      .catch((error) => {
        console.log("catch from axios request", error);
      });
  } catch (error) {
    res.json({ message: "catch from Game router" });
  }
});

router.get("/game/:id/game-series", async (req, res) => {
  console.log("route game-series");
  try {
    axios
      .get(
        `https://api.rawg.io/api/games/${req.params.id}/game-series?key=${process.env.API_KEY}`
      )
      .then((response) => {
        const home = response.data;
        res.status(200).json(home);
      })
      .catch((error) => {
        console.log("catch from axios request of game-series", error);
      });
  } catch (error) {
    res.json({ message: "catch from Game-series router" });
  }
});

module.exports = router;
