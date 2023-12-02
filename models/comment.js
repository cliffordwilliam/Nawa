'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Comment.init({
    commenter_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"commenter_id is required"},
        notEmpty:{msg:"commenter_id is required"}
      }
    },
    commented_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"commented_id is required"},
        notEmpty:{msg:"commented_id is required"}
      }
    },
    is_positive: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"is_positive is required"},
        notEmpty:{msg:"is_positive is required"}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:"content is required"},
        notEmpty:{msg:"content is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};