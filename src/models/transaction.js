"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet, { foreignKey: "wallet_id" });
      Transaction.belongsTo(models.Ticket, { foreignKey: "ticket_id" });
      Transaction.belongsTo(models.TransactionType, {
        foreignKey: "transaction_type_id",
      });
    }
  }
  Transaction.init(
    {
      ticket_id: DataTypes.STRING,
      content: DataTypes.TEXT,
      transaction_type_id: DataTypes.INTEGER,
      wallet_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
