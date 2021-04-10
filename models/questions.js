'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      questions.hasMany(models.answers, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
    }
  };
  questions.init({
    testId: DataTypes.INTEGER,
    question: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};