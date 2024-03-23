const User = require("../models/user.js");
const express = require("express");
const router = express.Router();
const authenticateUser = require("../utils/jwtAuth.js");
const upload = require("../utils/uploadFile.js");
const bcrypt = require("bcrypt");

//Afficher tous les utilisateurs
router.get("/", async (req, res) => {
  const allUSer = await User.findAll();
  return res.status(200).json(allUSer);
});

//Afficher un utilisateur Specifique
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
});

//modifier la photo de l'utilisatue
router.put(
  "/upload/:userId",
  upload.single("image"),
  authenticateUser,
  async (req, res) => {
    const userId = req.params.userId;
    // Vérifier si l'utilisateur existe et correspond à celui connecté
    if (!req.userInfo || req.userInfo.id !== parseInt(userId)) {
      return res
        .status(403)
        .json("Vous n'êtes pas autorisé à modifier ce profil");
    }

    try {
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json("L'utilisateur n'existe pas");
      }

      if (req.file) {
        existingUser.img = req.file.path; // ou vous pouvez utiliser une fonction pour nettoyer le chemin comme mentionné précédemment
      }

      await existingUser.save();

      return res.status(200).json("Photo de profil mise à jour avec succès");
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(
          "Une erreur est survenue lors de la mise à jour de la photo de profil"
        );
    }
  }
);

//Ajouter des utilisateur

//Modifier les users
router.put(
  "/:id",
  authenticateUser,
  upload.single("image"),
  async (req, res) => {
    const userId = req.params.id;
    const { email, username, password, telephone } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);
    try {
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json("Utilisateur introuvable");
      }
      const updateUser = await existingUser.update({
        username: username,
        email: email,
        telephone: telephone,
        password: hashPass,
        img: req.file.path,
      });
      res.status(200).json("utilisateur a ete mise jour avec succes");
      console.log(updateUser);
    } catch (e) {
      console.log(e);
    }
  }
);

//Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.destroy({ where: { id: userId } });
    res.status(200).json("utilisateur a ete supprimer avec succes");
    console.log(deleteUser);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
