const Bus = require("./models/bus.docs");
const RoleType = require("./models/roletype.docs");
const Route_Station = require("./models/route_station.docs");
const Route = require("./models/route.docs");
const Seat = require("./models/seat.docs");
const Station = require("./models/station.docs");
const Ticket = require("./models/ticket.docs");
const Transaction = require("./models/transaction.docs");
const TransactionType = require("./models/transactiontype.docs");
const Wallet = require("./models/wallet.docs");
const WalletType = require("./models/wallettype.docs");
const Trip = require("./models/trip.docs");

module.exports = {
  components: {
    schemas: {
      ...Bus,
      ...RoleType,
      ...Route_Station,
      ...Route,
      ...Seat,
      ...Station,
      ...Ticket,
      ...Transaction,
      ...TransactionType,
      ...Wallet,
      ...WalletType,
      ...Trip,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authentication",
        description: "Bearer Token",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
