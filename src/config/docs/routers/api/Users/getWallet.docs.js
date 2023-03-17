module.exports = {
    get: {
        tags: ["User"],
        security: [
            {
                bearerAuth: [],
            },
        ],
        description: "API for get the wallet information of a user",
        responses: {
            200: {
                description: "Get wallet successfully!",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    example: "Success",
                                },
                                messages: {
                                    type: "string",
                                    example: "Get wallet successfully!",
                                },
                                data: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                            example: "5f9f1b9b9c9d1c0b8c8b8b8b",
                                        },
                                        balance: {
                                            type: "number",
                                            example: 20,
                                        },
                                        user_id: {
                                            type: "string",
                                            example: "5f9f1b9b9c9d1c0b8c8b8b8b",
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2020-10-30T08:00:00.000Z",
                                        },
                                        updatedAt: {
                                            type: "string",
                                            example: "2020-10-30T08:00:00.000Z",
                                        },
                                        User: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    example: "5f9f1b9b9c9d1c0b8c8b8b8b",
                                                },
                                                fullname: {
                                                    type: "string",
                                                    example: "Nguyen Van A",
                                                },
                                                email: {
                                                    type: "string",
                                                    example: "anv@fpt.edu.vn",
                                                },
                                                student_id: {
                                                    type: "string",
                                                    example: "SE159999",
                                                }
                                            }
                                        }
                                    }
                                },
                            },
                        },
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
                description: "Wallet not found!",
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
                                    example: "Wallet not found!",
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
