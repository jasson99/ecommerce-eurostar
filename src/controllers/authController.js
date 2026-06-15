const authService = require("../services/authService");

function validateAuthBody(body) {
  const { email, password } = body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }
}

function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    validateAuthBody(req.body);

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const result = authService.register({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

function login(req, res, next) {
  try {
    validateAuthBody(req.body);

    const { email, password } = req.body;
    const result = authService.login({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
