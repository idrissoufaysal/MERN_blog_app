const User = require("../models/user.js");
const Post = require("../models/post.js");
const express = require("express");
const router = express.Router();

const upload = require("../utils/uploadFile.js");
const { json } = require("sequelize");
const authenticateUser = require("../utils/jwtAuth.js");
const Favorie = require("../models/Favorie.js");

router.get("/", authenticateUser, async (req, res) => {
  try {
    const f = await Favorie.findAll({
      where: { userId: req.userInfo.id },
      include: Post,
    });
    res.status(200).json(f);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de l'affichage des favori" });
  }
});

// router.post("/",authenticateUser, async (req, res) => {
//   const { postId } = req.body;

//   try {
//     await Favorie.create({
//       postId: postId,
//       userId: req.userInfo.id,
//     });
//     res.status(200).json("vous avez ajouter au favorie avec succes");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Erreur lors de l'ajout du favori" });
//   }
// });

router.post("/", authenticateUser, async (req, res) => {
  const { postId } = req.body;

  try {
    const fav = await Favorie.findOne({
      where: { postId: postId, userId: req.userInfo.id },
    });
    if (fav) {
      fav.destroy();
      return res.status(200).json({
        status: false,
        message: "favorie supprimer",
        favorie:fav
      });
    }
    const newFav=await Favorie.create({
      postId: postId,
      userId: req.userInfo.id,
      ok:true
    });
    res.status(200).json({
      status: true,
      message: "vous avez ajouter au favorie avec succes",
      favorie:newFav
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de l'ajout du favori" });
  }
});

router.delete("/", authenticateUser, async (req, res) => {
  const { postId } = req.body;
  try {
    await Favorie.destroy({
      where: {
        userId: req.userInfo.id,
        postId: postId,
      },
    });
    res.status(200).json("Post supprimer avec succes");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du favori" });
  }
});

module.exports = router;
