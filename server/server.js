const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { auth, dashboard } = require("./routes");
const config = require("./config");
const checkAuth = require("./middlewares/check-auth");
const XErrorX = require("./helpers/XErrorX");
const path = require("path");
const fs = require("fs");

XErrorX.handleNotCaughtError();

config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/dashboard", checkAuth, dashboard);

if (process.env.NODE_ENV == "development") {
  app.use(
    cors({
      origin: "http://localhost",
      credentials: true,
    })
  );
} else {
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log("Server Started");
});

app.use(XErrorX.handleOnMiddleware);
