module.exports = {
  get: {
    tags: ["Users"],
    description: "API for managing users",
    parameters: {
      key: {
        name: "key",
        in: "path",
        description: "Key of redis",
        required: true,
        type: "string",
      },
    },
    responses: {
      200: {
        description: "Get all user successfully",
      },
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
