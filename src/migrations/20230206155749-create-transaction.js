"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaction", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ticket_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Ticket",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      wallet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Wallet",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('TOPUP', 'REFUND', 'PAYMENT'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('SUCCESS', 'FAILED', 'PENDING'),
        defaultValue: 'success',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transaction");
  },
};
