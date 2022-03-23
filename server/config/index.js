const path = require("path");
const env = require("dotenv");

module.exports = () => {
  env.config({ path: path.join(__dirname, "../", ".env") });
};
