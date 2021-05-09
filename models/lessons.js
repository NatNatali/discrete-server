'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lessons.hasMany(models.user_lessons, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
    }
  }
  lessons.init({
    sectionId: DataTypes.INTEGER,
    lecture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'lessons',
  });
  return lessons;
};