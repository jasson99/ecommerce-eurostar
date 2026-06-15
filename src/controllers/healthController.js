function healthcheck(_req, res) {
  return res.status(200).json({
    status: "ok",
    service: "ecommerce-eurostar-api",
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  healthcheck,
};
