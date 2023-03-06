module.exports = {
  get: {
    tags: ["User"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "API for getting all users",
    parameters: [
      {
        name: "search_query",
        in: "query",
        required: false,
        description: "Search query",
        type: "string",
      },
      {
        name: "role_name",
        in: "query",
        required: false,
        description: "User's role name",
        type: "string",
      },
      {
        name: "status",
        in: "query",
        required: false,
        description: "User's status",
        type: "boolean",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        description: "Limit number of users",
        type: "number",
      },
      {
        name: "page",
        in: "query",
        required: false,
        description: "Page number",
        type: "number",
      },
    ],
    responses: {
      200: {
        description: "Get all user successfully!",
        schema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "Success",
            },
            messages: {
              type: "string",
              example: "Get all user successfully!",
            },
            data: {
              type: "array",
              items: {
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
        description: "Not found",
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
                  example: "User list is empty!",
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
