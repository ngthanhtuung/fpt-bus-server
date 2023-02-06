"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     WalletTypes:
   *       type: object
   *       required:
   *         - id
   *         - type_name
   *         - status
   *       properties:
   *         id:
   *          type: integer
   *          description: The auto-generated id of the wallet type
   *         type_name:
   *           type: string
   *           description: The name of the wallet type
   *         status:
   *          type: boolean
   *          description: The status of the wallet type
   *       example:
   *         id: 1
   *         type_name: Momo
   *         status: true
   */
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
