module.exports = {
  post: {
    tags: ["Station"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "API for changing status of station (ENABLE or DISABLE)",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "Station ID",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Station status updated successfully!",
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
                  example: "Station is enable (disabled)!",
                },
                data: {
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
                      example: false,
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
        description: "Station is not existed!",
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
                  example: "Station is not existed!",
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
