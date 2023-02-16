module.exports = {
    post: {
        tags: ["File"],
        description: "API for user sign in to the system",
        requestBody: {
            name: "UploadFile",
            description: "Type: profile, qrCode , imageBase64: data:image/jpeg;base64,/9j..., idUser:uuid",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: true,
                        properties: {
                            type: {
                                type: "string",
                            },
                            imageBase64: {
                                type: "string"
                            },
                            idUser: {
                                type: "string"
                            }
                        },
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "Upload Successfully!!",
            },
            400: {
                description: "Miss paraming !!!"
            },
            // response code
            500: {
                description: "Server error", // response desc.
            },
        },
    },
};
