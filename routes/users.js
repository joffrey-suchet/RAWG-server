const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//import du model User
const User = require("../models/User");

// route pour créer un compte

router.post("/home/signup", async (req, res) => {
  try {
    if (req.body.username === undefined) {
      res.status(400).json({ message: "missing parameter" });
    } else {
      const isUserExisting = await User.findOne({
        email: req.body.email,
      });
      if (isUserExisting === null) {
        const salt = uid2(16);
        const hash = SHA256(req.body.password + salt).toString(encBase64);
        const token = uid2(32);
        console.log("salt==>", salt);
        console.log("hash==>", hash);

        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();
        console.log(newUser);
        res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          token: newUser.token,
        });
      } else {
        res.status(409).json({ message: "the mail already has an account" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// route pour se connecter à un compte

router.post("/home/signin", async (req, res) => {
  try {
    const userToCheck = await User.findOne({ email: req.body.email });

    if (userToCheck === null) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      const newHash = SHA256(req.body.password + userToCheck.salt).toString(
        encBase64
      );
      console.log("newHash=>", newHash);
      console.log("hash present en BDD=>", userToCheck.hash);

      if (newHash === userToCheck.hash) {
        res.json({
          _id: userToCheck._id,
          token: userToCheck.token,
          username: userToCheck.username,
        });
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
