'use strict';


const Helper = require('../helper/helper');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment)
      this.hasMany(models.Order)
      this.hasMany(models.UserOrders)
      this.hasMany(models.OrderAttempts)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{msg:"username is required"},
        notEmpty:{msg:"username is required"},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"password is required"},
        notEmpty:{msg:"password is required"}
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"role is required"},
        notEmpty:{msg:"role is required"}
      }
    },
    reputation_score: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0,
      validate:{
        notNull:{msg:"reputation_score is required"},
        notEmpty:{msg:"reputation_score is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    const HASHED_PASSWORD = await Helper.passwordHasher(user.password)
    user.password = HASHED_PASSWORD
  });
  return User;
};