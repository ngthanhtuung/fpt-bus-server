module.exports = {
  Users: {
    type: "object",
    required: ["id", "fullname", "role_id"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the user",
      },
      fullname: {
        type: "string",
        description: "The fullname of the user",
      },
      email: {
        type: "string",
        description: "The email address of the user",
      },
      phone_number: {
        type: "string",
        description: "The phone number of the user",
      },
      student_id: {
        type: "string",
        description: "The student id of the user",
      },
      profile_img: {
        type: "string",
        description: "The profile image of the user",
      },
      status: {
        type: "boolean",
        description: "The status of the user",
      },
      role_id: {
        type: "integer",
        description: "The id of the role",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      fullname: "Nguyen Van A",
      email: "nguyenvana@fpt.edu.vn",
      phone_number: "0123456789",
      student_id: "SE150000",
      status: true,
      role_id: 1,
    },
  },
};
