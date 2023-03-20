module.exports = {
    get: {
        tags: ["Notification"],
        security: [
            {
                bearerAuth: [],
            },
        ],
        description: "API for getting all notification",
        responses: {
            200: {
                description: "Get notification successfully!",
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
                                    example: "Get notification successfully!",
                                },
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "5c526cde-a31b-4ee3-94c7-9c42cbdfd0dd",
                                            },
                                            title: {
                                                type: "string",
                                                example: "Notification title",
                                            },
                                            body: {
                                                type: "string",
                                                example: "Notification body",
                                            },
                                            dataTitle: {
                                                type: "string",
                                                example: "Notification data title",
                                            },
                                            dataBody: {
                                                type: "string",
                                                example: "Notification data body",
                                            },
                                            sentTime: {
                                                type: "string",
                                                example: "2023-02-22T05:23:14.000Z",
                                            },
                                            createdAt: {
                                                type: "string",
                                                example: "2023-02-22T05:23:14.000Z",
                                            },
                                            updatedAt: {
                                                type: "string",
                                                example: "2023-02-22T05:44:35.000Z",
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
