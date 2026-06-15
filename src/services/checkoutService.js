const productModel = require("../models/productModel");

const PAYMENT_METHODS = {
  CASH: "cash",
  CREDIT_CARD: "credit_card",
};

function checkout({ items, paymentMethod, user }) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Items are required");
    error.statusCode = 400;
    throw error;
  }

  if (
    ![PAYMENT_METHODS.CASH, PAYMENT_METHODS.CREDIT_CARD].includes(paymentMethod)
  ) {
    const error = new Error("Payment method must be cash or credit_card");
    error.statusCode = 400;
    throw error;
  }

  const detailedItems = items.map((item) => {
    if (
      !Number.isInteger(item.productId) ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      const error = new Error(
        "Each item must include integer productId and positive integer quantity",
      );
      error.statusCode = 400;
      throw error;
    }

    const product = productModel.findProductById(item.productId);
    if (!product) {
      const error = new Error(
        `Product with id ${item.productId} does not exist`,
      );
      error.statusCode = 400;
      throw error;
    }

    const lineTotal = Number((product.price * item.quantity).toFixed(2));

    return {
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
      lineTotal,
      currency: product.currency,
    };
  });

  const subtotal = Number(
    detailedItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2),
  );
  const discount =
    paymentMethod === PAYMENT_METHODS.CASH
      ? Number((subtotal * 0.1).toFixed(2))
      : 0;
  const total = Number((subtotal - discount).toFixed(2));

  return {
    customer: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    paymentMethod,
    items: detailedItems,
    summary: {
      subtotal,
      discount,
      total,
      currency: "EUR",
    },
  };
}

module.exports = {
  checkout,
  PAYMENT_METHODS,
};
