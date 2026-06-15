const express = require("express");
const swaggerController = require("../controllers/swaggerController");

const router = express.Router();

router.get("/swagger", swaggerController.getSwaggerFile);

module.exports = router;
