const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decode = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Fail",
      message: "You are not logged into the system",
    });
  }
};

const authorize = (arrayRole) => (req, res, next) => {
  try {
    const { user } = req;
    if (arrayRole.includes(user.role_name)) {
      next();
    } else {
      res.status(403).json({
        status: "Fail",
        message: "Access Denied",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      messages: error.message,
    });
  }
};

module.exports = {
  authenticate,
  authorize,
};
