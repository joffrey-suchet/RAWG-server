const router = express.router();
const axios = require("axios");

router.get("./home", async (req, res) => {
  console.log("route home");
  try {
    axios
      .get(`49f034579c6a41ebb56a4b58d1cc73ef?key=${process.env.API_KEY}`)
      .then((response) => {
        const games = response.data;
        res.status(200).json(games);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "catch from home router" });
  }
});

module.export = router;
