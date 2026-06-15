const path = require("path");

function getSwaggerFile(_req, res, next) {
  try {
    const swaggerPath = path.join(__dirname, "../../swagger.yaml");
    return res.type("application/yaml").sendFile(swaggerPath);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSwaggerFile,
};
