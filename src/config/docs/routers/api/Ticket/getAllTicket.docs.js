module.exports = {
    get: {
        tags: ["Ticket"],
        security: [
            {
                bearerAuth: [],
            },
        ],
        description: "API for getting all ticket",
        parameters: [
            {
                name: "status",
                in: "query",
                required: false,
                description: "Ticket's status",
                type: "boolean",
            },
            {
                name: "limit",
                in: "query",
                required: false,
                description: "Limit number of ticket",
                type: "number",
                default: 10
            },
            {
                name: "page",
                in: "query",
                required: false,
                description: "Page number",
                type: "number",
                default: 1
            },
        ],
        responses: {
            200: {
                description: "Get all ticket successfully!",
                schema: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "Success",
                        },
                        messages: {
                            type: "string",
                            example: "Get all ticket successfully!",
                        },
                        pagination: {
                            type: "object",
                            properties: {
                                total: {
                                    type: "number",
                                    example: 1,
                                },
                                limit: {
                                    type: "number",
                                    example: 10,
                                },
                                current_page: {
                                    type: "number",
                                    example: 1,
                                },
                                total_page: {
                                    type: "number",
                                    example: 1,
                                }
                            }
                        },
                        data: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        example: "17f118bb-efa9-4e98-9a20-ee9165fae23c"
                                    },
                                    trip_id: {
                                        type: "string",
                                        example: "e040cbba-6062-4b61-a536-1eb5f75bd9d5"
                                    },
                                    user_id: {
                                        type: "string",
                                        example: "27bc0459-e601-422d-8be1-8fbb12bf4d38"
                                    },
                                    checkInAt: {
                                        type: "string",
                                        example: "2023-03-07"
                                    },
                                    qrUrl: {
                                        type: "string",
                                        example: "https://firebasestorage.googleapis.com/v0/b/f-bus-system.appspot.com/o/qr-code%2Fqr-code-2023-03-09T17%3A59%3A44Z-17f118bb-efa9-4e98-9a20-ee9165fae23c?alt=media&token=c67de034-b009-472c-a944-0d5cc81db95c"
                                    },
                                    status: {
                                        type: "boolean",
                                        example: true
                                    },
                                    createdAt: {
                                        type: "string",
                                        example: "2023-03-09T17:59:43.000Z"
                                    },
                                    updatedAt: {
                                        type: "string",
                                        example: "2023-03-09T17:59:43.000Z"
                                    },
                                    Trip: {
                                        type: "object",
                                        properties: {
                                            departure_date: {
                                                type: "string",
                                                example: "2023-03-07"
                                            },
                                            departure_time: {
                                                type: "string",
                                                example: "07:00:00"
                                            },
                                            ticket_quantity: {
                                                type: "number",
                                                example: 10
                                            },
                                            Bus: {
                                                type: "object",
                                                properties: {
                                                    license_plate: {
                                                        type: "string",
                                                        example: "29C-12345"
                                                    },
                                                    seat_quantity: {
                                                        type: "number",
                                                        example: 39
                                                    },
                                                    User: {
                                                        type: "object",
                                                        properties: {
                                                            fullname: {
                                                                type: "string",
                                                                example: "Nguyen Van A"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            Route: {
                                                type: "object",
                                                properties: {
                                                    route_name: {
                                                        type: "string",
                                                        example: "Tuyến 1",
                                                    },
                                                    departure: {
                                                        type: "string",
                                                        example: "FPT University",
                                                    },
                                                    destination: {
                                                        type: "string",
                                                        example: "Vinhomes Grand Park",
                                                    }
                                                }
                                            }
                                        }
                                    }

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


