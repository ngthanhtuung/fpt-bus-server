const { Router } = require("express");
const { topUpWallet, getTransaction } = require('../controllers/payment.controller');
const {
    authenticate,
    authorize,
} = require("../middlewares/auth/verify-token.middleware");

const payRouter = Router();

payRouter.get("/transaction", [authenticate, authorize(['STUDENT'])], getTransaction);
payRouter.post("/top-up", [authenticate, authorize(['STUDENT'])], topUpWallet);

module.exports = payRouter;