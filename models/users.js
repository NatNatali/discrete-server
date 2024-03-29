'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.comments, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
      users.hasMany(models.user_lessons, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
    }
  }
  users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};