module.exports = {
  get: {
    tags: ["Bus"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "license_plate",
        in: "query",
        required: false,
        description: "Bus's license plate",
      },
      {
        name: "fullname",
        in: "query",
        required: false,
        description: "Driver's fullname",
      },
    ],
    description: "API for getting all bus",
    responses: {
      200: {
        description: "Get all bus successfully!",
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
                  example: "Get all bus successfully!",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "5c526cde-a31b-4ee3-94c7-9c42cbdfd0dd",
                      },
                      license_plate: {
                        type: "string",
                        example: "29B-144.21",
                      },
                      seat_quantity: {
                        type: "number",
                        example: 30,
                      },
                      driver_id: {
                        type: "string",
                        example: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
                      },
                      status: {
                        type: "boolean",
                        example: true,
                      },
                      createdAt: {
                        type: "string",
                        example: "2023-02-22T05:23:14.000Z",
                      },
                      updatedAt: {
                        type: "string",
                        example: "2023-02-22T05:44:35.000Z",
                      },
                      User: {
                        type: "object",
                        properties: {
                          fullname: {
                            type: "string",
                            example: "Nguyen Van A",
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
      },
      400: {
        description: "Bus list is empty!",
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
                  example: "Bus list is empty!",
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
