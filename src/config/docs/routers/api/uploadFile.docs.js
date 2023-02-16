module.exports = {
  post: {
    tags: ["Files"],
    description: "API for upload file to firebase storage",
    requestBody: {
      name: "UploadFile",
      description:
        "Type: profile, qrCode , imageBase64: data:image/jpeg;base64,/9j..., userId:uuid",
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
                type: "string",
              },
              userId: {
                type: "string",
              },
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
        description: "Miss paraming !!!",
      },
      // response code
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
