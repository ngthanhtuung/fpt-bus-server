"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("WalletTypes", [
      {
        type_name: "MOMO",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: "ZaloPay",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: "VNPay",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: "Stripe",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("WalletTypes", null, {});
  },
};
