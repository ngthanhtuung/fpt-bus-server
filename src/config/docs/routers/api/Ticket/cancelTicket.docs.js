module.exports = {
    post: {
        tags: ["Ticket"],
        security: [
            {
                bearerAuth: []
            }
        ],
        description: "Cancel ticket",
        parameters: [
            {
                name: "ticketId",
                in: "path",
                description: "Ticket ID",
                required: true
            },
        ],
        responses: {
            200: {
                description: "Cancel ticket successfully",
                schema: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            example: "Success",
                        },
                        messages: {
                            type: "string",
                            example: "Cancel ticket successfully",
                        },
                        data: {
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
                            },

                        },
                    },
                },
            },
            400: {
                description: "You can not cancel this ticket",
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
                                    example: "You can not cancel this ticket"
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
                description: "Ticket not found",
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
                                    example: "Ticket not found"
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
