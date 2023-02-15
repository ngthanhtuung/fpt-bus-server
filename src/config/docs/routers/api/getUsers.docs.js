module.exports = {
  get: {
    tags: ["Users"],
    description: "API for managing users",
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
