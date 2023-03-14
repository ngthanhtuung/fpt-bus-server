module.exports = {
    post: {
      tags: ["Authentication"],
      description: "API for driver sign in to the system",
      requestBody: {
        required: true,
        name: "phone",
        description: `Phone number is a string contain 10 numbers`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: true,
              properties: {
                phone: {
                    type: "string"
                }
              },
            },
          },
        },
      },
      responses: {
        // response code
        200: {
          description: "Verification is sent",
        },
        // response code
        400: {
            description: "Your phone number is not registered! Please contact your administrator to support your account!"
        },
        500: {
          description: "Server error", // response desc.
        },
      },
    },
  };
  