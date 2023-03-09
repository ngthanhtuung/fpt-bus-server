module.exports = {
    post: {
        tags: ["Ticket"],
        security: [
            {
                bearerAuth: [],
            },
        ],
        description: "Booking a ticket",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            trip_id: {
                                type: "string",
                            }
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Booking ticket successfully",
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
                                    example: "Booking ticket successfully",
                                },
                                data: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                            example: "06400300-bd98-43b2-bcec-d179863d5e3b",
                                        },
                                        trip_id: {
                                            type: "string",
                                            example: "e040cbba-6062-4b61-a536-1eb5f75bd9d5",
                                        },
                                        user_id: {
                                            type: "string",
                                            example: "40b74b46-3de7-4611-b720-ea31bbb95fec",
                                        },
                                        qrUrl: {
                                            type: "string",
                                            example: "https://firebasestorage.googleapis.com/v0/b/f-bus-system.appspot.com/o/qr-code%2Fqr-code-2023-03-09T12%3A47%3A30Z-06400300-bd98-43b2-bcec-d179863d5e3b?alt=media&token=ffec14a8-33d7-4c5d-933d-87bcba16b6ef",
                                        },
                                        status: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2023-03-09T12:47:30.000Z",
                                        },
                                        updadtedAt: {
                                            type: "string",
                                            example: "2023-03-09T12:47:30.000Z",
                                        },
                                    },

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
                                    example: "Booking ticket fail/Invalid Trip/You have already booked your ticket for this trip"
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
