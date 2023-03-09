module.exports = {
  post: {
    tags: ["Trip"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    description: "Create new trip",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              route_id: {
                type: "string",
              },
              bus_id: {
                type: "string",
              },
              departure_dates: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              departure_times: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              ticket_quantity: {
                type: "number",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Create 1 trip successfully, 1 trip already exists",
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
                  example: "Create 1 trip successfully, 1 trip already exists",
                },
                duplicates: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      date: {
                        type: "string",
                        example: "2023-03-08",
                      },
                      time: {
                        type: "string",
                        example: "12:00",
                      },
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
                        example: "a80fc36c-95e7-4617-b871-837e716c3ea7",
                      },
                      route_id: {
                        type: "string",
                        example: "93eca08e-32f3-44e1-a875-5f3b39e4f3f0",
                      },
                      bus_id: {
                        type: "string",
                        example: "ee64de9c-6a24-44fc-9430-28d34aa56bbe",
                      },
                      departure_date: {
                        type: "string",
                        example: "2023-03-08",
                      },
                      departure_time: {
                        type: "string",
                        example: "17:00",
                      },
                      ticket_quantity: {
                        type: "number",
                        example: 40,
                      },
                      status: {
                        type: "number",
                        example: 1,
                      },
                      createdAt: {
                        type: "string",
                        example: "2023-03-09 08:52:41",
                      },
                      updatedAt: {
                        type: "string",
                        example: "2023-03-09 08:52:41",
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
                  type: "string",
                  example:
                    "Ticket quantity must be less than or equal bus seat quantity",
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
