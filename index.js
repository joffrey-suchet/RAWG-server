const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

const home = require("./routes/home");
app.use(home);

const game = require("./routes/game");
app.use(game);

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

// app.listen(process.env.PORT, () => {
//   console.log("server has started");
// });

app.listen(3006, () => {
  console.log("server has started");
});
