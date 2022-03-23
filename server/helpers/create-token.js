const JWT = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return JWT.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
};

const createRefreshToken = (userId) => {
  return JWT.sign({ userId }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "2h",
  });
};

module.exports = { createAccessToken, createRefreshToken };
