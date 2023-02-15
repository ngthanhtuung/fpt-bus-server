module.exports = {
  Transaction: {
    type: "object",
    required: [
      "id",
      "ticket_id",
      "content",
      "transaction_type_id",
      "wallet_id",
    ],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the transaction",
      },
      ticket_id: {
        type: "string",
        description: "The id of the ticket",
      },
      content: {
        type: "string",
        description: "The content of the transaction",
      },
      transaction_type_id: {
        type: "integer",
        description: "The id of the transaction type",
      },
      wallet_id: {
        type: "string",
        description: "The id of the wallet",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      ticket_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      content: "Buy ticket",
      transaction_type_id: 1,
      wallet_id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
    },
  },
};
