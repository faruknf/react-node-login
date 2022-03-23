const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const logoutController = require("../controllers/logout");
const checkAuth = require("../middlewares/check-auth");

router.post("/login", loginController);
router.get("/logout", checkAuth, logoutController);

module.exports = router;
