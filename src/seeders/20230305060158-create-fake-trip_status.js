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
    return queryInterface.bulkInsert("Trip_Status", [
      {
        status_name: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_name: "CHECK-IN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status_name: "DEACTIVATED",
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
    return queryInterface.bulkDelete("Trip_Status", null, {});
  },
};
