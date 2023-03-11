module.exports = {
  put: {
    tags: ["User"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Update an existing user",
    parameters: [
      {
        name: "userId",
        in: "path",
        description: "User ID",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      description: `
      ADMIN profile only need to send: fullname, phone_number, profile_img
      ADMIN update for STUDENT and DRIVER profile need to send: fullname, email, phone_number, student_id, profile_img, role_id, status
      STUDENT and DRIVER profile only need to send: fullname, phone_number, profile_img
      `,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              fullname: {
                type: "string",
              },
              email: {
                type: "string",
              },
              phone: {
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
              status: {
                type: "boolean",
              }
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Updated user successfully",
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
                  example: "Updated user successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "2127094d-6615-4300-8a21-6d16eb66bf7c",
                    },
                    fullname: {
                      type: "string",
                      example: "Nguyen Van A",
                    },
                    email: {
                      type: "string",
                      example: "anvse159272@fpt.edu.vn",
                    },
                    phone_number: {
                      type: "string",
                      example: "0123456789",
                    },
                    student_id: {
                      type: "string",
                      example: "SE159272",
                    },
                    profile_img: {
                      type: "string",
                      example:
                        "https://lh3.googleusercontent.com/a/AEdFTp41vyAK7DlyiJYHOAVYUWa9uVd5pwQ7y8SlO80U=s96-c",
                    },
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    role_id: {
                      type: "integer",
                      example: 1,
                    },
                    createdAt: {
                      type: "string",
                      example: "2023-02-17T07:02:56.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2023-02-17T07:02:57.000Z",
                    },
                    RoleType: {
                      type: "object",
                      properties: {
                        role_name: {
                          type: "string",
                          example: "STUDENT",
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
        description: "Not Found",
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
                  example: "User is not existed!",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
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
                  example: "Internal server error",
                },
              },
            },
          },
        },
      },
    },
  },
};
