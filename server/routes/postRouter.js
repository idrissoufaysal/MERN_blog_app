const User = require("../models/user.js");
const Post = require("../models/post.js");
const express = require("express");
const router = express.Router();

const upload = require("../utils/uploadFile.js");
const { json } = require("sequelize");
const authenticateUser = require("../utils/jwtAuth.js");

//Afficher tous les post
router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    let post;
    if (category){

      post = await Post.findAll({
        where: { category },
        include: {
          model: User,
          attributes: ["id", "username", "email", "telephone", "img"],
        },
        order: [["createdAt", "DESC"]],
      });
      
    }else{

      post = await Post.findAll({
        include: {
        model: User,
        attributes: ["id", "username", "email", "telephone", "img"],
      },
      order: [["createdAt", "DESC"]],
    });
  }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await Post.findByPk(postId, {
      include: {
        model: User,
        attributes: ["id", "username", "email", "telephone", "img"],
      },
    });
    if (!existingPost) {
      return res.status(404).json({
        message: "Post introuvable",
      });
    }
    res.status(200).json(existingPost);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", upload.single("image"), authenticateUser, async (req, res) => {
  const { title, desc, img, category } = req.body;
  try {
    if (!req.file) {
      return res.json("Ajouter un ficher");
    }
    const newPost = await Post.create({
      title: title,
      desc: desc,
      category: category,
      img: req.file.path,
      userId: req.userInfo.id,
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
});

router.put(
  "/:id",
  upload.single("image"),
  authenticateUser,
  async (req, res) => {
    const postId = req.params.id;
    const { title, desc ,category} = req.body;
    try {
      const existingPost = await Post.findByPk(postId);
      if (!existingPost) {
        return res.status(404).json({
          message: "Post introuvable",
        });
      }

      existingPost.update({
        title: title,
        desc: desc,
        category: category,
        img: req.file? req.file.path : existingPost.img,
        img: req.file ? req.file.path : existingPost.img,
        userId: req.userInfo.id,
      });
      res.status(200).json("Post mise a jour avec succes");
    } catch (error) {
      console.log(error);
    }
  }
);

router.delete("/:id", authenticateUser, async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await Post.findByPk(postId);
    if (!existingPost) {
      return res.status(404).json("Post introuvable");
    }
    await existingPost.destroy();
    res.status(200).json("Post supprimer avec succes");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
