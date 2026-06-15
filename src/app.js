const express = require("express");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "E-commerce Eurostar API is running",
    endpoints: [
      "POST /register",
      "POST /login",
      "POST /checkout",
      "GET /healthcheck",
      "GET /swagger",
      "GET /docs",
    ],
  });
});

app.use(routes);
app.use(errorHandler);

module.exports = app;
