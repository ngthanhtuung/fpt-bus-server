module.exports = {
    post: {
        tags: ["Notification"],
        security: [
            {
                bearerAuth: [],
            },
        ],
        description: "API for creating a new notification",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        description: "Notification object",
                        properties: {
                            title: {
                                type: "string",
                            },
                            body: {
                                type: "string",
                            },
                            dataTitle: {
                                type: "string",
                            },
                            dataBody: {
                                type: "string",
                            },
                            sentTime: {
                                type: "string",
                            },
                            userId: {
                                type: "string",
                            }
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Create notification successfully!",
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
                                    example: "Create notification successfully!",
                                },
                                data: {
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
                                        user_id: {
                                            type: "string",
                                            example: "5c526cde-a31b-4ee3-94c7-9c42cbdfd0dd"
                                        },
                                        createdAt: {
                                            type: "string",
                                            example: "2023-02-22T05:23:14.000Z",
                                        },
                                        updatedAt: {
                                            type: "string",
                                            example: "2023-02-22T05:23:14.000Z",
                                        }

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


