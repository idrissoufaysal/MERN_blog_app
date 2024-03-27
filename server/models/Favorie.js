const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');

const Favorie = sequelize.define('favorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ok: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  }
});

module.exports = Favorie;
