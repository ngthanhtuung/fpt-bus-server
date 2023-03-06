module.exports = {
  post: {
    tags: ["User"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "API for creating a new user",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: true,
            description: "User object",
            properties: {
              fullname: {
                type: "string",
              },
              email: {
                type: "string",
              },
              phone_number: {
                type: "string",
              },
              student_id: {
                type: "string",
              },
              profile_img: {
                type: "string",
              },
              role_id: {
                type: "number",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Created user successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Success",
                },
                message: {
                  type: "string",
                  example: "Created user successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "c1754352-dc1c-48d9-a28d-2b1e9bea63ee",
                    },
                    fullname: {
                      type: "string",
                      example: "Nguyen Van A",
                    },
                    email: {
                      type: "string",
                    },
                    phone_number: {
                      type: "string",
                    },
                    student_id: {
                      type: "string",
                    },
                    profile_img: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: "User is already exists!",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Fail",
                },
                message: {
                  type: "string",
                  example: "User is already exists!",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Fail",
                },
                message: {
                  type: "string",
                  example: "You are not logged into the system",
                },
              },
            },
          },
        },
      },
      403: {
        description: "Forbidden",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Fail",
                },
                message: {
                  type: "string",
                  example: "Access denied",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Fail",
                },
                message: {
                  type: "string",
                  example: "Server error",
                },
              },
            },
          },
        },
      },
    },
  },
};
