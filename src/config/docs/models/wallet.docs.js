module.exports = {
  Wallet: {
    type: "object",
    required: ["id", "wallet_type_id", "balance"],
    properties: {
      id: {
        type: "string",
        description: "The auto-generated id of the wallet",
      },
      balance: {
        type: "double",
        description: "The balance of the wallet",
      },
      wallet_type_id: {
        type: "integer",
        description: "The id of the wallet type",
      },
    },
    example: {
      id: "4eb76978-2c07-47ea-87eb-d4484c5c3acd",
      balance: 1000000,
      wallet_type_id: 1,
    },
  },
};
