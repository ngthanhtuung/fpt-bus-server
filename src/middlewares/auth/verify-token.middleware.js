const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.header("accessToken");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      message: "You are not logged into the system",
    });
  }
};

const authorize = (req, res, next) => {};

module.exports = {
  authenticate,
  authorize,
};
