module.exports = {
  get: {
    tags: ["Station"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Get all station",
    parameters: [
      {
        name: "station_name",
        in: "query",
        description: "Station name",
        required: false,
      },
      {
        name: "status",
        in: "query",
        description: "Station status",
        required: false,
      },
    ],
    responses: {
      200: {
        description: "Get all station successfully",
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
                  example: "Get all station successfully!",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "0e9fa2f3-756b-4d73-94f7-b9a73cd5d71b",
                      },
                      station_name: {
                        type: "string",
                        example: "University of Transportation",
                      },
                      longitude: {
                        type: "string",
                        example: "106.7919828",
                      },
                      latitude: {
                        type: "string",
                        example: "10.8457017",
                      },
                      status: {
                        type: "boolean",
                        example: true,
                      },
                      createdAt: {
                        type: "string",
                        example: "2021-02-22T05:23:14.000Z",
                      },
                      updadtedAt: {
                        type: "string",
                        example: "2021-02-22T05:44:35.000Z",
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
        description: "Station list is empty",
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
                  example: "Station list is empty",
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
