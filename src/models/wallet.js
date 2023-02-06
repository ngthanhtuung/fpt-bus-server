"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Wallet:
   *       type: object
   *       required:
   *         - id
   *         - balance
   *         - wallet_type_id
   *       properties:
   *         id:
   *          type: string
   *          description: The auto-generated id of the wallet
   *         balance:
   *           type: double
   *           description: The balance of the wallet
   *         wallet_type_id:
   *           type: integer
   *           description: The id of the wallet type
   *       example:
   *         id: 4eb76978-2c07-47ea-87eb-d4484c5c3acd
   *         balance: 1000000
   *         wallet_type_id: 1
   */
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
      Wallet.belongsTo(models.User, { foreignKey: "user_id" });
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
