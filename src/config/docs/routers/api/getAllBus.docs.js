module.exports = {
  get: {
    security: {
      bearerAuth: [],
    },
    tags: ["Bus"],
    description: "API for getting all bus",
    responses: {
      200: {
        description: "Get all bus successfully!",
      },
      400: {
        description: "Bus list is empty!",
      },
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
