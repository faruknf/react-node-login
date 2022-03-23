const XErrorX = require("../helpers/XErrorX");
const pool = require("../models/db");
const bycrptjs = require("bcryptjs");
const {
  createRefreshToken,
  createAccessToken,
} = require("../helpers/create-token");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new XErrorX("Enter All Fields", 400, { isForClient: true });
    } else {
      const query = `SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE email=$1`;
      const result = await pool.query(query, [email]);
      if (
        result.rows.length > 0 &&
        bycrptjs.compareSync(password, result.rows[0].password)
      ) {
        const accessToken = createAccessToken(result.rows[0].id);
        const refreshToken = createRefreshToken(result.rows[0].id);

        res.cookie("accesstoken", accessToken, {
          maxAge: 1 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          sameSite: "Lax",
        });
        res.cookie("refreshtoken", refreshToken, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          sameSite: "Lax",
        });
        return res.status(200).json({
          payload: {
            user: { id: result.rows[0].id, email, isAuth: true },
          },
        });
      }
      throw new XErrorX("Invalid Email and Password", 401, {
        isForClient: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
