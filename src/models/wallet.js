"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.hasMany(models.Transaction, { foreignKey: "wallet_id" });
      Wallet.belongsTo(models.WalletTypes, { foreignKey: "wallet_type_id" });
      Wallet.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Wallet.init(
    {
      balance: DataTypes.DOUBLE,
      wallet_type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
