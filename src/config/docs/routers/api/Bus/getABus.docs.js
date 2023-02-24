module.exports = {
  post: {
    tags: ["Bus"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "API for getting an existed bus",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Bus ID",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Get a bus successfully!",
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
                  example: "Get a bus successfully!",
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
                        example: 50,
                      },
                      driver_id: {
                        type: "string",
                        example: "67c8d25a-6caf-4192-9f0a-d44de8d45461",
                      },
                      status: {
                        type: "boolean",
                        example: false,
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
      404: {
        description: "Bus not found!",
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
                  example: "Bus not found!",
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
