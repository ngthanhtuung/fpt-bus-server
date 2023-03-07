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
        id: "1749db96-728d-4f8a-b803-48e2e93b0980",
        departure: "Vinhomes Grand Park",
        destination: "FPT University",
        status: 1,
        createdAt: "2023-03-07 03:48:01",
        updatedAt: "2023-03-07 03:48:01",
      },
      {
        id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        departure: "FPT University",
        destination: "HCMC University of Education Student Dormitory",
        status: 1,
        createdAt: "2023-03-07 03:45:01",
        updatedAt: "2023-03-07 03:45:01",
      },
      {
        id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        departure: "FPT University",
        destination: "Vinhomes Grand Park",
        status: 1,
        createdAt: "2023-03-07 03:47:44",
        updatedAt: "2023-03-07 03:47:44",
      },
      {
        id: "96e01504-4bf3-4429-9b8a-1df25c603177",
        departure: "HCMC University of Education Student Dormitory",
        destination: "FPT University",
        status: 1,
        createdAt: "2023-03-07 03:47:06",
        updatedAt: "2023-03-07 03:47:06",
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
