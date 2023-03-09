module.exports = {
  put: {
    tags: ["Route"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Update an exsited route",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "Route ID",
        required: true,
        type: "string",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              start: {
                type: "string",
                description: "Departure station",
              },
              end: {
                type: "string",
                description: "Destination station",
              },
              status: {
                type: "boolean",
                description: "Route status",
              },
              stations: {
                type: "array",
                description: "List of stations",
                items: {
                  type: "string",
                  example: "0e9fa2f3-756b-4d73-94f7-b9a73cd5d71b",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Route updated successfully",
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
                  example: "Route created successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "f4fb68c8-1cb3-4a57-9fcf-0485c346614b",
                    },
                    departure: {
                      type: "string",
                      example: "FPT University",
                    },
                    destination: {
                      type: "string",
                      example: "Vinhomes Grand Park",
                    },
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    createdAt: {
                      type: "string",
                      example: "2023-03-03 08:32:13",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2023-03-03 09:32:13",
                    },
                    stations: {
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
        description: "Route not found",
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
                  example: "Route not found",
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
