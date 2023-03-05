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
        id: "690091b1-419d-43d8-b724-a306d66780d1",
        license_plate: "72B-144.21",
        seat_quantity: 45,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 1,
        createdAt: "2023-02-24 09:06:38",
        updatedAt: "2023-03-02 02:45:34",
      },
      {
        id: "7bdcfb3d-b2e4-4877-aca6-dcd487f2a34d",
        license_plate: "29B-144.21",
        seat_quantity: 45,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 1,
        createdAt: "2023-02-28 03:46:26",
        updatedAt: "2023-03-02 02:26:17",
      },
      {
        id: "804f788b-195d-4538-9aa2-ffc0c433df83",
        license_plate: "61E-144.21",
        seat_quantity: 12,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 1,
        createdAt: "2023-03-02 02:24:39",
        updatedAt: "2023-03-02 02:25:40",
      },
      {
        id: "921a13e6-5776-489d-b310-081e5dcfad91",
        license_plate: "60E-144.21",
        seat_quantity: 17,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 1,
        createdAt: "2023-02-26 12:57:19",
        updatedAt: "2023-03-02 02:12:53",
      },
      {
        id: "bb28381e-4354-499d-a8bf-8fde4201798a",
        license_plate: "61B-144.21",
        seat_quantity: 45,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 1,
        createdAt: "2023-02-24 07:24:58",
        updatedAt: "2023-02-25 06:46:05",
      },
      {
        id: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
        license_plate: "30E-144.21",
        seat_quantity: 40,
        driver_id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        status: 0,
        createdAt: "2023-02-24 02:54:50",
        updatedAt: "2023-03-02 02:50:19",
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
    return queryInterface.bulkDelete("Bus", null, {});
  },
};
