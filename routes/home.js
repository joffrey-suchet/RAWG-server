const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  console.log("route home");
  console.log(req.query);
  try {
    if (req.query.input) {
      axios
        .get(
          `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.input}`
        )
        .then((response) => {
          const home = response.data;
          console.log(home);
          res.status(200).json(home);
        })
        .catch((error) => {
          console.log("catch from axios request", error);
        });
    } else {
      axios
        .get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
        .then((response) => {
          const home = response.data;
          res.status(200).json(home);
        })
        .catch((error) => {
          console.log("catch from axios request", error);
        });
    }
  } catch (error) {
    res.json({ message: "catch from home router" });
  }
});

module.exports = router;
