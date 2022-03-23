const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/create-token");
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/verify-token");
const XErrorX = require("../helpers/XErrorX");

const checkAuth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accesstoken;
    if (!accessToken) {
      throw new XErrorX("You need to log in to view content", 401, {
        isForClient: true,
      });
    }
    const decodedFromAccessToken = verifyAccessToken(accessToken);

    req.userId = decodedFromAccessToken.userId;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      try {
        const refreshToken = req.cookies.refreshtoken;
        const decodedFromRefreshToken = verifyRefreshToken(refreshToken);
        const newAccessToken = createAccessToken(
          decodedFromRefreshToken.userId
        );
        const newRefreshToken = createRefreshToken(
          decodedFromRefreshToken.userId
        );
        res.cookie("accesstoken", newAccessToken, {
          maxAge: 1 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          sameSite: "Lax",
        });
        res.cookie("refreshtoken", newRefreshToken, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
        });
        req.userId = decodedFromRefreshToken.userId;
        next();
        return;
      } catch (error) {
        return res
          .status(401)
          .json({ payload: { error: "You need to log in" } });
      }
    }
    return res.status(401).json({ payload: { error: "You need to log in" } });
  }
};

module.exports = checkAuth;
