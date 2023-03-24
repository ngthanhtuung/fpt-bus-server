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
        id: "2127094d-6615-4300-8a21-6d16eb66bf7c",
        fullname: "Nguyen Quoc Sy",
        email: "synqse151029@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151029",
        profile_img: "https://lh3.googleusercontent.com/a/AEdFTp41vyAK7DlyiJYHOAVYUWa9uVd5pwQ7y8SlO80U=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-17 07:02:56",
        updatedAt: "2023-02-17 07:02:57"
      },
      {
        id: "27bc0459-e601-422d-8be1-8fbb12bf4d38",
        fullname: "Nguyen Thanh Tung",
        email: "tungntse151167@fpt.edu.vn",
        phone_number: "",
        student_id: "SE151167",
        profile_img: "https://lh3.googleusercontent.com/a/AEdFTp6nxisMFiu4JLuvyrw3nye0vG3UFvdcCFaF7BuFHQ=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-02-23 08:06:29",
        updatedAt: "2023-02-23 08:06:29"
      },
      {
        id: "2acc4919-7c55-41aa-8d38-7e2d2800e86d",
        fullname: "Mai Ngoc Hai Hung (K15 HCM)",
        email: "hungmnhse151102@fpt.edu.vn",
        phone_number: null,
        student_id: "SE151102",
        profile_img: "https://lh3.googleusercontent.com/a/AGNmyxbq4eU9dkHcQdffp1ch3SyTpyivCfxi-A7SrK9n=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-03-23 17:34:29",
        updatedAt: "2023-03-23 17:34:29"
      },
      {
        id: "37161fd7-393e-4d8c-8a79-c90e35c5f5bd",
        fullname: "Nguyễn Văn A",
        email: "anv@fpt.edu.vn",
        phone_number: "0963918220",
        student_id: null,
        profile_img: "https://firebasestorage.googleapis.com/v0/b/f-bus-system.appspot.com/o/profile%2Fprofile-user-2023-03-23T12%3A30%3A08Z-37161fd7-393e-4d8c-8a79-c90e35c5f5bd?alt=media&token=068e38cc-bc7c-4c50-abde-a22821149e2f",
        status: 1,
        role_id: 3,
        createdAt: "2023-03-18 01:26:47",
        updatedAt: "2023-03-23 12:30:11"
      },
      {
        id: "492e153c-5441-4d7f-b2d0-5ccc57cf7b22",
        fullname: "Tân Nguyễn",
        email: "tannhse151046@fpt.edu.vn",
        phone_number: null,
        student_id: "SE151046",
        profile_img: "https://lh3.googleusercontent.com/a/AEdFTp4iFwOauZM0ogzfPQ4xqHevIwXK9vAefGb7EdhE=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-03-21 06:01:57",
        updatedAt: "2023-03-21 06:01:57"
      },
      {
        id: "6a5b8806-d073-4049-93fd-eedc0235ed6d",
        fullname: "Dao Duc Thinh (K15 HCM)",
        email: "thinhddse151086@fpt.edu.vn",
        phone_number: null,
        student_id: "SE151086",
        profile_img: "https://lh3.googleusercontent.com/a/AEdFTp6xp1dNQL4aqgRPzxY_ZkxXrmi5mHiwVCkbPZ4N5w=s96-c",
        status: 1,
        role_id: 2,
        createdAt: "2023-03-23 17:46:31",
        updatedAt: "2023-03-23 17:46:31"
      },
      {
        id: "9026d758-b235-4da7-9d43-06f65c2a2ae8",
        fullname: "Nguyễn Nguyên Vũ",
        email: "vuntnse151234@fpt.edu.vn",
        phone_number: "0906918521",
        student_id: null,
        profile_img: "",
        status: 1,
        role_id: 3,
        createdAt: "2023-03-23 11:14:29",
        updatedAt: "2023-03-23 11:14:29"
      },
      {
        id: "a94632f1-a70b-441b-a7c2-2cf3f121f895",
        fullname: "Ngô Xuân Thiệp",
        email: "thiepnxse151074@fpt.edu.vn",
        phone_number: "0987872717",
        student_id: "SE151074",
        profile_img: "https://firebasestorage.googleapis.com/v0/b/f-bus-system.appspot.com/o/profile%2Fprofile-user-2023-03-23T12%3A24%3A54Z-a94632f1-a70b-441b-a7c2-2cf3f121f895?alt=media&token=057a1149-b4db-4a3c-aa92-22c19125cb55",
        status: 1,
        role_id: 2,
        createdAt: "2023-03-23 12:20:04",
        updatedAt: "2023-03-23 12:24:56"
      },
      {
        id: "d67645fe-a790-409f-9bad-45a9a5e4cdc4",
        fullname: "Doan Vu Quang Huy",
        email: "huydvqse151224@fpt.edu.vn",
        phone_number: null,
        student_id: "SE151224",
        profile_img: "https://lh3.googleusercontent.com/a/AEdFTp6v8jjXEsGQ6lGFaYNCUPSVoeQyE5iGAY1h9ArBAQ=s96-c",
        status: 1,
        role_id: 1,
        createdAt: "2023-03-21 13:56:43",
        updatedAt: "2023-03-21 13:56:43"
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
