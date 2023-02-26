module.exports = {
  post: {
    tags: ["Station"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Create new station",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              station_name: {
                type: "string",
              },
              longitude: {
                type: "string",
              },
              latitude: {
                type: "string",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Create new station successfully",
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
                  type: "object",
                  properties: {
                    station_name: {
                      type: "string",
                      example: "Station name is required",
                    },
                    longitude: {
                      type: "string",
                      example: "Longitude is not valid",
                    },
                    latitude: {
                      type: "string",
                      example: "Latitude is not valid",
                    },
                  },
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
