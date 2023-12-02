'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Order.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"title is required"},
        notEmpty:{msg:"title is required"}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{msg:"description is required"},
        notEmpty:{msg:"description is required"}
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"status is required"},
        notEmpty:{msg:"status is required"}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"UserId is required"},
        notEmpty:{msg:"UserId is required"}
      }
    },
    reward_points: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"reward_points is required"},
        notEmpty:{msg:"reward_points is required"}
      }
    },
    allow_multiple_takers: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"allow_multiple_takers is required"},
        notEmpty:{msg:"allow_multiple_takers is required"}
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"type is required"},
        notEmpty:{msg:"type is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};