module.exports = {
  get: {
    tags: ["Users"],
    description: "API for managing users",
    parameters: [
      // expected params.
      {
        name: "key", // name of the param
        in: "path", // location of the param
        required: true, // Mandatory param
        description: "key value of redis", // param desc.
        type: "string",
      },
    ],
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
