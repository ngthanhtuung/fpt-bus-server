module.exports = {
    post: {
        tags: ["Payment"],
        security: [
            {
                bearerAuth: []
            }
        ],
        description: "API for pay top up to wallet",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        description: "Payment object",
                        properties: {
                            amount: {
                                type: "number"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Top-up success!",
                content: {
                    "application/json": {
                        schema: {
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
                                    example: "Amount is required and amount must be greater than 15",
                                },
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