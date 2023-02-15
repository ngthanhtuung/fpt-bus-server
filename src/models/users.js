"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.RoleTypes, { foreignKey: "role_id" });
      Users.hasMany(models.Bus, { foreignKey: "driver_id" });
      Users.hasMany(models.Ticket, { foreignKey: "user_id" });
      Users.hasOne(models.Wallet, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      student_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
