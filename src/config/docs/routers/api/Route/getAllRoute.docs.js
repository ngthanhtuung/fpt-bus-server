module.exports = {
  get: {
    tags: ["Route"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Get all route",
    parameters: [
      {
        name: "search_query",
        in: "query",
        description: "Search query",
        required: false,
      }
    ],
    responses: {
      200: {
        description: "Get all route successfully",
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
                  example: "Get all route successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "f4fb68c8-1cb3-4a57-9fcf-0485c346614b",
                    },
                    route_name: {
                      type: "string",
                      example: "Route 1",
                    },
                    departure: {
                      type: "string",
                      example: "FPT University",
                    },
                    departure_coordinates: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          latitude: {
                            type: "string",
                            example: "10.8457017",
                          },
                          longitude: {
                            type: "string",
                            example: "106.7919828",
                          }
                        }
                      }
                    },
                    destination: {
                      type: "string",
                      example: "Vinhomes Grand Park",
                    },
                    destination_coordinates: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          latitude: {
                            type: "string",
                            example: "10.8457017",
                          },
                          longitude: {
                            type: "string",
                            example: "106.7919828",
                          }
                        }
                      }
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
        description: "Route list is empty",
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
                  example: "Route list is empty",
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
