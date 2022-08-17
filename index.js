const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

require("dotenv").config();
app.use(cors());

const home = require("./routes/home");
app.use(home);

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
