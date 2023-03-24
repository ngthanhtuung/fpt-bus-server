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
    return queryInterface.bulkInsert("Trip", [
      {
        id: "070a0dfe-23e4-4b5c-866c-baffb2d07ccc",
        route_id: "e7b8b1f7-82bd-4105-ba92-46bc06e66a54",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "01:35:00",
        ticket_quantity: 9,
        status: 1,
        createdAt: "2023-03-23 17:55:59",
        updatedAt: "2023-03-23 17:56:11"
      },
      {
        id: "390ce087-e227-4761-9f35-b8ed80b7952a",
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "01:30:00",
        ticket_quantity: 10,
        status: 1,
        createdAt: "2023-03-23 17:27:01",
        updatedAt: "2023-03-23 17:28:21"
      },
      {
        id: "44e02f3f-d30a-43d4-97ed-375c9f776132",
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        bus_id: "398cf2b4-a6b7-47ac-8410-8bf518c199a1",
        departure_date: "2023-03-24",
        departure_time: "19:30:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-23 12:08:13",
        updatedAt: "2023-03-23 17:00:00"
      },
      {
        id: "473ddf52-bba3-4795-9c66-e384636989c7",
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "23:50:00",
        ticket_quantity: 9,
        status: 3,
        createdAt: "2023-03-23 16:41:26",
        updatedAt: "2023-03-23 17:00:00"
      },
      {
        id: "54b97ea4-086e-4bd0-a95e-57c9c5d0671e",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "18:00:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-23 10:10:27",
        updatedAt: "2023-03-23 10:10:27"
      },
      {
        id: "752c4472-275d-4872-b92f-95c4f0172b20",
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "23:59:00",
        ticket_quantity: 9,
        status: 3,
        createdAt: "2023-03-23 16:54:05",
        updatedAt: "2023-03-23 17:00:00"
      },
      {
        id: "81f0f2aa-3a86-475a-b85a-4f0824b97adb",
        route_id: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "17:30:00",
        ticket_quantity: 40,
        status: 3,
        createdAt: "2023-03-23 10:10:27",
        updatedAt: "2023-03-23 11:08:41"
      },
      {
        id: "e3efb742-6d7e-4c3e-a4c1-c46b2dc2590e",
        route_id: "19fd6e79-9dcb-4e63-9b88-74c964170332",
        bus_id: "690091b1-419d-43d8-b724-a306d66780d1",
        departure_date: "2023-03-24",
        departure_time: "19:45:00",
        ticket_quantity: 39,
        status: 5,
        createdAt: "2023-03-23 12:17:42",
        updatedAt: "2023-03-23 12:32:44"
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
    return queryInterface.bulkDelete("Trip", null, {});
  }
};
