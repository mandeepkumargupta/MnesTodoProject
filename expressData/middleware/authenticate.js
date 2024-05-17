const jwt = require("jsonwebtoken");
require("dotenv").config();

const { promisify } = require("util");
const verifyToken = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  try {
    const token = require.header("Authorization").replace("bearer", "");
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "access denied,no token provided",
      });
    }
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Invalid token",
    });
  }
};
