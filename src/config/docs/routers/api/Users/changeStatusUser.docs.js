module.exports = {
  put: {
    tags: ["User"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "API for changing status of user (ENABLE or DISABLE)",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "User ID",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "User status updated successfully!",
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
                  example: "User is enable (disabled)!",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "ddfdbbb3-32ff-464f-b24e-45b8c53a0358",
                    },
                    fullname: {
                      type: "string",
                      example: "Nguyen Van A",
                    },
                    email: {
                      type: "string",
                      example: "anv@fe.edu.vn",
                    },
                    student_id: {
                      type: "string",
                    },
                    profile_img: {
                      type: "string",
                    },
                    phone_number: {
                      type: "string",
                      example: "0123456789",
                    },
                    status: {
                      type: "boolean",
                      example: false,
                    },
                    role_id: {
                      type: "number",
                      example: 3,
                    },
                    createdAt: {
                      type: "string",
                      example: "2021-08-10T08:00:00.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2021-08-10T08:00:00.000Z",
                    },
                    RoleTypes: {
                      type: "object",
                      properties: {
                        role_name: {
                          type: "string",
                          example: "DRIVER",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: "Bad request",
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
                  example: "You're loggin into the system. Operation denied!",
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
      404: {
        description: "User is not found!",
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
                  example: "User is not found!",
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
