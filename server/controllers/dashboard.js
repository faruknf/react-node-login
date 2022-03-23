const dashboardController = (req, res) => {
  res
    .status(200)
    .json({ payload: { message: `You loged in with ${req.userId} id` } });
};

module.exports = dashboardController;
