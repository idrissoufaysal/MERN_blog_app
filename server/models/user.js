const DataTypes = require("sequelize");
const sequelize = require("../db/db.js");

 const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telephone: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  img: {
    type: DataTypes.STRING,
  },
 });

 module.exports = User;
