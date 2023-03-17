module.exports = {
    get: {
        tags: ["Payment"],
        security: [
            {
                bearerAuth: []
            }
        ],
        parameters: [
            {
                name: "page",
                in: "query",
                description: "Page number",
                required: false,
            },
            {
                name: "limit",
                in: "query",
                description: "Limit number",
                required: false,
            }
        ],
        description: "API for get all transaction",
        responses: {
            200: {
                description: "Get all transaction successfully!",
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
                                    example: "Get all transaction successfully!",
                                },
                                pagination: {
                                    type: "object",
                                    properties: {
                                        total: {
                                            type: "number",
                                            example: 10
                                        },
                                        per_page: {
                                            type: "number",
                                            example: 10
                                        },
                                        current_page: {
                                            type: "number",
                                            example: 1
                                        },
                                        total_page: {
                                            type: "number",
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
                                                example: "036cdd6b-404f-4e7a-bdac-fb59e4acc074"
                                            },
                                            wallet_id: {
                                                type: "string",
                                                example: "5b17671d-eeb8-4767-a5e8-9f2e6f5bf20e"
                                            },
                                            amount: {
                                                type: "number",
                                                example: 10
                                            },
                                            type: {
                                                type: "string",
                                                example: "TOPUP"
                                            },
                                            status: {
                                                type: "string",
                                                example: "SUCCESS"
                                            },
                                            createdAt: {
                                                type: "string",
                                                example: "2021-08-10T09:00:00.000Z"
                                            },
                                            updatedAt: {
                                                type: "string",
                                                example: "2021-08-10T09:00:00.000Z"
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
        }
    }
}