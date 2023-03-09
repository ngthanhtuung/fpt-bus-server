module.exports = {
  get: {
    tags: ["Trip"],
    security: [
      {
        bearerAuth: []
      }
    ],
    description: "Get all trip",
    parameters: [
      {
        name: "date",
        in: "query",
        description: "Required for STUDENT role",
        required: false
      },
      {
        name: "route_id",
        in: "query",
        description: "Required for STUDENT role",
        required: false
      }
    ],
    responses: {
      200: {
        description: "Get all trip successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Success"
                },
                message: {
                  type: "string",
                  example: "Trip created successfully"
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "e2f21481-3400-4e1a-983f-e30c96d96282"
                      },
                      route_id: {
                        type: "string",
                        example: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0"
                      },
                      bus_id: {
                        type: "string",
                        example: "ee64de9c-6a24-44fc-9430-28d34aa56bbe"
                      },
                      departure_date: {
                        type: "string",
                        example: "2023-03-08"
                      },
                      departure_time: {
                        type: "string",
                        example: "12:00"
                      },
                      ticket_quantity: {
                        type: "number",
                        example: "40"
                      },
                      createdAt: {
                        type: "string",
                        example: "2023-03-07T12:51:18.000Z"
                      },
                      updatedAt: {
                        type: "string",
                        example: "2023-03-07T12:51:18.000Z"
                      },
                      status_name: {
                        type: "string",
                        example: "ACTIVE"
                      },
                      departure: {
                        type: "string",
                        example: "FPT University"
                      },
                      destination: {
                        type: "string",
                        example: "Vinhomes Grand Park"
                      },
                      license_plate: {
                        type: "string",
                        example: "30E-144.21"
                      },
                      driver_name: {
                        type: "string",
                        example: "Nguyen Van A"
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
                  example: "Fail"
                },
                message: {
                  type: "string",
                  example: "You are not logged into the system"
                }
              }
            }
          }
        }
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
                  example: "Fail"
                },
                message: {
                  type: "string",
                  example: "Access denied"
                }
              }
            }
          }
        }
      },
      404: {
        description: "Trip not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "Fail"
                },
                message: {
                  type: "string",
                  example: "Trip not found"
                }
              }
            }
          }
        }
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
                  example: "Fail"
                },
                message: {
                  type: "string",
                  example: "Internal server error"
                }
              }
            }
          }
        }
      }
    }
  }
};
