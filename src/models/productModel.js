const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.5,
    currency: "EUR",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 79.9,
    currency: "EUR",
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 44,
    currency: "EUR",
  },
];

function getProducts() {
  return [...products];
}

function findProductById(id) {
  return products.find((product) => product.id === id) || null;
}

module.exports = {
  getProducts,
  findProductById,
};
