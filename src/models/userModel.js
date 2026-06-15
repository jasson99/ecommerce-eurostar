const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    password: bcrypt.hashSync("alice123", 10),
  },
  {
    id: 2,
    name: "Bruno Costa",
    email: "bruno@example.com",
    password: bcrypt.hashSync("bruno123", 10),
  },
  {
    id: 3,
    name: "Carla Mendes",
    email: "carla@example.com",
    password: bcrypt.hashSync("carla123", 10),
  },
];

let nextUserId = 4;

function findByEmail(email) {
  return (
    users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ||
    null
  );
}

function findById(id) {
  return users.find((user) => user.id === id) || null;
}

function createUser({ name, email, passwordHash }) {
  const newUser = {
    id: nextUserId,
    name,
    email,
    password: passwordHash,
  };

  nextUserId += 1;
  users.push(newUser);
  return newUser;
}

function getPublicUsers() {
  return users.map(({ password, ...publicUser }) => publicUser);
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  getPublicUsers,
};
