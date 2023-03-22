const { Router } = require("express");
const { auth } = require("firebase-admin");
const {
  findAllUser,
  createUser,
  changeStatus,
  updateUser,
  getWallet,
  userPushNoti
} = require("../controllers/user.controller");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/verify-token.middleware");

const userRouter = Router();

userRouter.get("/", [authenticate, authorize(["ADMIN"])], findAllUser);
userRouter.get("/wallet", [authenticate, authorize(["STUDENT"])], getWallet);
userRouter.post("/create", [authenticate, authorize(["ADMIN"])], createUser);
userRouter.post("/push-notification/:idUser", [], userPushNoti);
userRouter.put("/update/:userId", [authenticate], updateUser)
userRouter.put("/change-status/:id", [
  authenticate,
  authorize(["ADMIN"]),
  changeStatus,
]);

module.exports = userRouter;
