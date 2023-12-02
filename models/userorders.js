'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
      this.belongsTo(models.Order)
    }
  }
  UserOrders.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"UserId is required"},
        notEmpty:{msg:"UserId is required"}
      }
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"OrderId is required"},
        notEmpty:{msg:"OrderId is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'UserOrders',
  });
  return UserOrders;
};