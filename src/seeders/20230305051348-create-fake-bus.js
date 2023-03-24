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
    return queryInterface.bulkInsert("Bus", [

      {
        id: "398cf2b4-a6b7-47ac-8410-8bf518c199a1",
        license_plate: "59B-999.99",
        seat_quantity: 45,
        driver_id: "9026d758-b235-4da7-9d43-06f65c2a2ae8",
        status: 1,
        createdAt: "2023-03-23 12:07:36",
        updatedAt: "2023-03-23 12:07:36"
      },
      {
        id: "690091b1-419d-43d8-b724-a306d66780d1",
        license_plate: "51B-144.22",
        seat_quantity: 45,
        driver_id: "37161fd7-393e-4d8c-8a79-c90e35c5f5bd",
        status: 1,
        createdAt: "2023-02-24 09:06:38",
        updatedAt: "2023-03-21 05:39:22"
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
    return queryInterface.bulkDelete("Bus", null, {});
  },
};
