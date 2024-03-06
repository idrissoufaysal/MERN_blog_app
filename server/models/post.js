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
});

module.exports = Post;
