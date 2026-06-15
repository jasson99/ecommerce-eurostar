const request = require("supertest");
const { expect } = require("chai");

describe("API Path Coverage", function () {
  const baseUrl = process.env.API_BASE_URL || "http://127.0.0.1:3000";
  const api = request(baseUrl);
  let token;

  it("covers GET /", async function () {
    const response = await api.get("/");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "message",
      "E-commerce Eurostar API is running",
    );
    expect(response.body).to.have.property("endpoints").that.is.an("array");
  });

  it("covers GET /healthcheck", async function () {
    const response = await api.get("/healthcheck");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "ok");
    expect(response.body).to.have.property("service", "ecommerce-eurostar-api");
    expect(response.body).to.have.property("timestamp").that.is.a("string");
  });

  it("covers GET /swagger", async function () {
    const response = await api.get("/swagger");

    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/yaml");
    expect(response.text).to.include("openapi: 3.0.3");
  });

  it("covers GET /docs", async function () {
    const response = await api.get("/docs");

    expect(response.status).to.equal(301);
    expect(response.headers).to.have.property("location", "/docs/");
  });

  it("covers POST /register", async function () {
    const uniqueEmail = `daniel+${Date.now()}@example.com`;
    const response = await api.post("/register").send({
      name: "Daniel Silva",
      email: uniqueEmail,
      password: "daniel123",
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("token").that.is.a("string");
    expect(response.body).to.have.property("user").that.is.an("object");
    expect(response.body.user).to.have.property("name", "Daniel Silva");
    expect(response.body.user).to.have.property("email", uniqueEmail);
  });

  it("covers POST /login", async function () {
    const response = await api.post("/login").send({
      email: "alice@example.com",
      password: "alice123",
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token").that.is.a("string");
    expect(response.body).to.have.property("user").that.is.an("object");
    expect(response.body.user).to.have.property("email", "alice@example.com");

    token = response.body.token;
  });

  it("covers POST /checkout", async function () {
    expect(token, "token from login test").to.be.a("string").that.is.not.empty;

    const response = await api
      .post("/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentMethod: "cash",
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("paymentMethod", "cash");
    expect(response.body).to.have.property("items").that.is.an("array");
    expect(response.body).to.have.property("summary").that.is.an("object");
    expect(response.body.summary).to.have.property("subtotal", 95);
    expect(response.body.summary).to.have.property("discount", 9.5);
    expect(response.body.summary).to.have.property("total", 85.5);
    expect(response.body.summary).to.have.property("currency", "EUR");
  });
});
