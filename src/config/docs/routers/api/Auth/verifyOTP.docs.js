module.exports = {
    post: {
      tags: ["Authentication"],
      description: "API for driver to verify OTP",
      requestBody: {
        required: true,
        description: `Phone number is a string contain 10 numbers, and OTP verification code contain 4 numbers`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: true,
              properties: {
                phone: {
                    type: "string"
                },
                code: {
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
          description: "Login successfully!",
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
  