const { DataTypes } = require('sequelize');
const {db} = require('../database/db');

const Review = db.define('review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true

  }
});

module.exports = Review;