module.exports = {
  TransactionType: {
    type: "object",
    required: ["id", "type_name"],
    properties: {
      id: {
        type: "integer",
        description: "The auto-generated id of the transaction type",
      },
      type_name: {
        type: "string",
        description: "The name of the transaction type",
      },
    },
    example: {
      id: 1,
      type_name: "Payment",
    },
  },
};
