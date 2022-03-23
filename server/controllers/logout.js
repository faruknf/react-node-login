const logoutController = (req, res, next) => {
  res.cookie("accesstoken", "expired", {
    maxAge: -1,
    httpOnly: true,
  });
  res.cookie("refreshtoken", "expired", {
    maxAge: -1,
    httpOnly: true,
  });
  res.status(200).json({ payload: { message: "You loged out successfully" } });
};

module.exports = logoutController;
