const checkoutService = require("../services/checkoutService");

function checkout(req, res, next) {
  try {
    const { items, paymentMethod } = req.body;

    const result = checkoutService.checkout({
      items,
      paymentMethod,
      user: req.user,
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  checkout,
};
