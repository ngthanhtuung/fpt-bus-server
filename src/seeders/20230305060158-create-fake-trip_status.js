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
        id: 1,
        status_name: "ACTIVE",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      },
      {
        id: 2,
        status_name: "CHECK-IN",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      },
      {
        id: 3,
        status_name: "DEACTIVATED",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      },
      {
        id: 4,
        status_name: "STARTED",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      },
      {
        id: 5,
        status_name: "FINISHED",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      },
      {
        id: 6,
        status_name: "CANCELED",
        createdAt: "2023-03-18 01:13:40",
        updatedAt: "2023-03-18 01:13:40"
      }
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
