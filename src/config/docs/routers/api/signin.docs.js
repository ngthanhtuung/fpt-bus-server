module.exports = {
  post: {
    tags: ["Authentication"],
    description: "API for user sign in to the system",
    requestBody: {
      name: "accessToken",
      description: "User credentials",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: true,
            properties: {
              accessToken: {
                type: "string",
              },
            },
          },
        },
      },
    },
    responses: {
      // response code
      200: {
        description: "Login sucessfully",
      },
      // response code
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
