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
    return queryInterface.bulkInsert("Route", [
      {
        id: "339fa8f1-e526-489e-93ae-70d615caafe6",
        departure: "FPT University",
        destination: "Vinhomes Grand Park",
        status: 1,
        createdAt: "2023-03-03 09:53:13",
        updatedAt: "2023-03-03 14:52:44",
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
    return queryInterface.bulkDelete("Route", null, {});
  },
};
