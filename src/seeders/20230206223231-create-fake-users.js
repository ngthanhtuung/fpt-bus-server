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
    return queryInterface.bulkInsert("Users", [
      {
        id: "16709fb3-9e3f-4412-92d1-989925589db4",
        fullname: "Vu Tan Tai (K15 HCM)",
        email: "taivtse151030@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151030",
        profile_img:
          "https://lh3.googleusercontent.com/a/AGNmyxZ_ju2MRwnCQ2BiKfUT6yOTUyts9Qxwot-bNJyh=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-27 05:50:46",
        updatedAt: "2023-02-27 05:50:46",
      },
      {
        id: "1f267056-ded6-40cf-be39-03e568e4c624",
        fullname: "Vo Phuoc Thanh (K15 HCM)",
        email: "thanhvpse151066@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151066",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp7O84MlN6H4jFkbk2Z7QDV1x_HoEU5qxI-rhgAjIw=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-22 14:55:01",
        updatedAt: "2023-02-22 14:55:01",
      },
      {
        id: "2127094d-6615-4300-8a21-6d16eb66bf7c",
        fullname: "Nguyen Quoc Sy",
        email: "synqse151029@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151029",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp41vyAK7DlyiJYHOAVYUWa9uVd5pwQ7y8SlO80U=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-17 07:02:56",
        updatedAt: "2023-02-17 07:02:57",
      },
      {
        id: "27bc0459-e601-422d-8be1-8fbb12bf4d38",
        fullname: "Nguyen Thanh Tung",
        email: "tungntse151167@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151167",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp6nxisMFiu4JLuvyrw3nye0vG3UFvdcCFaF7BuFHQ=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-23 08:06:29",
        updatedAt: "2023-02-23 08:06:29",
      },
      {
        id: "30af7ca5-bad7-4405-9926-d72968d0dfb9",
        fullname: "Ho Thi Kim Ha (K15 HCM)",
        email: "hahtkss150151@fpt.edu.vn",
        phone_number: "",
        student_id: "SS150151",
        profile_img:
          "https://lh3.googleusercontent.com/a/AGNmyxZIyXU_tY3IBqRgqYPZfbzvpBtxw4R7yPn_qM2d=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-23 08:34:19",
        updatedAt: "2023-02-23 08:34:19",
      },
      {
        id: "30eb4343-d120-4cf6-99bb-98bf4ef1c9fe",
        fullname: "Tran Thi Uyen Nhi (K15 HCM)",
        email: "nhittuse150312@fpt.edu.vn",
        phone_number: "",
        student_id: "SE150312",
        profile_img:
          "https://lh3.googleusercontent.com/a/AGNmyxaHh1Tqi8WHTear7riihNe86u34ceRVmE6Yn2zI=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-23 08:32:17",
        updatedAt: "2023-02-23 08:32:17",
      },
      {
        id: "40b74b46-3de7-4611-b720-ea31bbb95fec",
        fullname: "Doan Vu Quang Huy",
        email: "huydvqse151224@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151224",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp6v8jjXEsGQ6lGFaYNCUPSVoeQyE5iGAY1h9ArBAQ=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-20 14:25:01",
        updatedAt: "2023-02-20 14:25:01",
      },
      {
        id: "47412747-def1-4237-b2e9-e4ead475b835",
        fullname: "Nguyen Hoan Tan",
        email: "tannhse151046@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151046",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp4iFwOauZM0ogzfPQ4xqHevIwXK9vAefGb7EdhE=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-17 06:52:23",
        updatedAt: "2023-02-17 06:52:23",
      },
      {
        id: "57d7ebad-733b-4b76-9584-05f1418cd909",
        fullname: "Ngo Xuan Thiep",
        email: "thiepnxse151074@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151074",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp5l__SbVFxhePlOzf1sLS2RushptpDshhk82SUGlw=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-17 07:04:49",
        updatedAt: "2023-02-17 07:04:49",
      },
      {
        id: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
        fullname: "Dao Duc Thinh",
        email: "thinhddse151086@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151086",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp6xp1dNQL4aqgRPzxY_ZkxXrmi5mHiwVCkbPZ4N5w=s96-c",
        status: 1,
        role_id: 3,
        createdAt: "2023-02-16 11:19:03",
        updatedAt: "2023-02-16 11:19:03",
      },
      {
        id: "6f507208-466c-4cdd-82f2-4e52be57494f",
        fullname: "Nguyen Trong Nguyen (K15 HCM)",
        email: "nguyenntse151227@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151227",
        profile_img:
          "https://lh3.googleusercontent.com/a/AEdFTp5q2VJvlbpWkxbqQQP82jGMDmGpIhCr9dUz-4Qc=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-22 07:30:37",
        updatedAt: "2023-02-22 07:30:37",
      },
      {
        id: "a9e69b78-b8c7-4b37-85c8-2c2fd0d79b25",
        fullname: "Mai Ngoc Hai Hung (K15 HCM)",
        email: "hungmnhse151102@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151102",
        profile_img:
          "https://lh3.googleusercontent.com/a/AGNmyxbq4eU9dkHcQdffp1ch3SyTpyivCfxi-A7SrK9n=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-23 17:22:50",
        updatedAt: "2023-02-23 17:22:50",
      },
      {
        id: "d7d686f3-ae50-431e-80ef-e3a98a83bef3",
        fullname: "Nguyen Thi Hang",
        email: "hangntss150297@fpt.edu.vn",
        phone_number: "",
        student_id: "SS150297",
        profile_img:
          "https://lh3.googleusercontent.com/a/AGNmyxaPXlqnP-Us3rDsYczrDQQWguxU0_cQQTHcud_d=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-02-23 08:27:07",
        updatedAt: "2023-02-23 08:27:07",
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
