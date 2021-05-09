'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_lessons.belongsTo(models.users, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
      user_lessons.belongsTo(models.lessons, {
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE',
      })
    }
  };
  user_lessons.init({
    userId: DataTypes.INTEGER,
    lessonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_lessons',
  });
  return user_lessons;
};