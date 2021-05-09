'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.users, {
        foreignKey: { allowNull: true },
        onDelete: 'CASCADE',
      });
    }
  };
  comments.init({
    userId: DataTypes.INTEGER,
    chapterId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};