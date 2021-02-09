'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chapters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chapters.hasMany(models.sections, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      });
    }
  }
  chapters.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chapters',
  });
  return chapters;
};