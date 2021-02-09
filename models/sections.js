'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sections.hasMany(models.lessons, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
    }
  }
  sections.init({
    chapterId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sections',
  });
  return sections;
};