const { Router } = require("express");
const { topUpWallet } = require('../controllers/payment.controller');
const {
    authenticate,
    authorize,
} = require("../middlewares/auth/verify-token.middleware");

const payRouter = Router();

payRouter.post("/top-up", [authenticate, authorize(['STUDENT'])], topUpWallet);

module.exports = payRouter;