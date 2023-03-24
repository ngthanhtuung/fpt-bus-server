module.exports = {
    get: {
        tags: ["Route"],
        security: [
            {
                bearerAuth: []
            }
        ],
        description: "Get total distance and time of route",
        parameters: [
            {
                name: "idRoute",
                in: "path",
                description: "Route ID",
                required: true
            },
        ],
        responses: {
            200: {
                description: "Get total distance and time of route successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    example: "Success",
                                },
                                data: {
                                    type: "object",
                                    properties: {
                                        TotalDistance: {
                                            type: "string",
                                            example: "12.82km",
                                        },
                                        TotalTime: {
                                            type: "string",
                                            example: "30.77mins",
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
                description: "Route not found",
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
                                    example: "Route not found"
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
