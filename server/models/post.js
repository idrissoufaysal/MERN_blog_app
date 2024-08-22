const DataTypes = require("sequelize");
const sequelize = require("../db/db.js");

const Post = sequelize.define("posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.ENUM('Dart', 'Javascript', 'Python', 'Autre','Php'), // Les valeurs possibles
    allowNull: false,
  },
});

module.exports = Post;
