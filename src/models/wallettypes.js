"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WalletTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WalletTypes.hasMany(models.Wallet, { foreignKey: "wallet_type_id" });
    }
  }
  WalletTypes.init(
    {
      type_name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "WalletTypes",
    }
  );
  return WalletTypes;
};
