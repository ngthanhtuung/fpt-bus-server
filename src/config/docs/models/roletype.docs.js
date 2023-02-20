module.exports = {
  RoleType: {
    type: "object",
    required: ["id", "role_name"],
    properties: {
      id: {
        type: "integer",
        description: "The auto-generated id of the role type",
      },
      role_name: {
        type: "string",
        description: "The name of the role type",
      },
      status: {
        type: "boolean",
        description: "The status of the role type",
      },
    },
    examples: {
      id: 1,
      role_name: "STUDENT",
      status: true,
    },
  },
};
