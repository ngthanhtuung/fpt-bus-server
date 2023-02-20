module.exports = {
  post: {
    tags: ["Notification"],
    description: "Send notification to device",
    requestBody: {
      name: "Notification",
      description: "Request object notification",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: true,
            properties: {
              token: {
                type: "string",
                required: true,
              },
              title: {
                type: "string",
                required: true,
              },
              content: {
                type: "string",
                required: true,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Notification sent successfully!",
      },
      404: {
        description: "Token device not found!",
      },
      500: {
        description: "Notification sent failed!",
      },
    },
  },
};
