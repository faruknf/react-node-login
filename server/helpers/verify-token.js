const jwt = require("jsonwebtoken");

const verifyAccessToken = (access_token) => {
  return jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET_KEY);
};
const verifyRefreshToken = (refresh_token) => {
  return jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = { verifyAccessToken, verifyRefreshToken };
