const { Router } = require("express");
const { signIn, signInPhoneNumber, verifyCodeNumber } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/phone/sign-in", signInPhoneNumber);
authRouter.post("/verify-phone", verifyCodeNumber);

module.exports = authRouter;
