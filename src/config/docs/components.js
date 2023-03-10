const Bus = require("./models/bus.docs");
const RoleType = require("./models/roletype.docs");
const Route_Station = require("./models/route_station.docs");
const Route = require("./models/route.docs");
const Station = require("./models/station.docs");
const Ticket = require("./models/ticket.docs");
const Transaction = require("./models/transaction.docs");
const TransactionType = require("./models/transactiontype.docs");
const Wallet = require("./models/wallet.docs");
const WalletType = require("./models/wallettype.docs");
const Trip = require("./models/trip.docs");
const Users = require("./models/users.docs");

module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...Users,
      ...Bus,
      ...RoleType,
      ...Route_Station,
      ...Route,
      ...Station,
      ...Ticket,
      ...Transaction,
      ...TransactionType,
      ...WalletType,
      ...Trip,
    },
  },
};
