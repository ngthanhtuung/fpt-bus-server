module.exports = {
  Wallet_Type: {
    type: "object",
    required: ["id", "type_name", "status"],
    properties: {
      id: {
        type: "integer",
        description: "The auto-generated id of the wallet type",
      },
      type_name: {
        type: "string",
        description: "The name of the wallet type",
      },
      status: {
        type: "integer",
        description: "The status of the wallet type",
      },
    },
    example: {
      id: 1,
      type_name: "Momo",
      status: 1,
    },
  },
};
