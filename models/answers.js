'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  answers.init({
    questionId: DataTypes.INTEGER,
    isCorrect: DataTypes.BOOLEAN,
    option: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};