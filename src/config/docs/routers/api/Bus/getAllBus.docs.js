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
        name: "search_query",
        in: "query",
        required: false,
        description: "Search key word",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        description: "Limit number of bus",
      },
      {
        name: "page",
        in: "query",
        required: false,
        description: "Page number",
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
                pagination: {
                  type: "object",
                  properties: {
                    total: {
                      type: "number",
                      example: 10,
                    },
                    limit: {
                      type: "number",
                      example: 10,
                    },
                    page: {
                      type: "number",
                      example: 1,
                    },
                    numPage: {
                      type: "number",
                      example: 1,
                    },
                  },
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
                      driver_name: {
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
