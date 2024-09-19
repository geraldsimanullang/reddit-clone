const { sign, verify } = require("jsonwebtoken");
const secret_key = process.env.JSONWEBTOKEN_SECRET;

module.exports = {
  signToken: (payload) => {
    return sign(payload, secret_key);
  },
  verifyToken: (token) => {
    return verify(token, secret_key);
  },
};
