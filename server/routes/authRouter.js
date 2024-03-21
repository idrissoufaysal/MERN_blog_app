const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecrete = "fnidaf";
const express = require("express");

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  //If user exit
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(401)
        .json({ message: `l'utilisateur ${user.email} existe dejas` });
    }

    await User.create({
      username: username,
      email: email,
      password: hashPass,
    });

    res.status(200).json({ message: "Compte cree avec success" });
  } catch (error) {
    console.log(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //if user exite
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "email ou mot de pass incorrect" });
    }
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(400).json({ message: "email ou mot de pass incorrect" });
    } else {
      const token = jwt.sign({ id: user.id }, "secretKey");
      const { password, ...other } = user.dataValues;
      return res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          user: other,
          token: token,
        });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("l'utilisateur a ete deconnecte");
});

module.exports = router;
