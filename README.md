# E-commerce Eurostar API

## Description

This project is a REST API for an e-commerce checkout flow built with JavaScript and Express.

The API supports user registration/login with JWT authentication and checkout with these business rules:

- Checkout accepts only `cash` or `credit_card`.
- `cash` payment gets a 10% discount.
- Only authenticated users can checkout.

The application runs fully in memory, with no database.

## Installation

1. Clone the repository.
2. Enter the project folder.
3. Install dependencies:

```bash
npm install
```

## How to Run

Start the API:

```bash
npm start
```

By default, the server runs on `http://localhost:3000`.

Optional environment variables:

- `PORT`: custom server port.
- `JWT_SECRET`: custom JWT secret.

## Rules

1. Only these endpoints exist:
   - `POST /register`
   - `POST /login`
   - `POST /checkout`
   - `GET /healthcheck`
2. `POST /checkout` requires a valid JWT token in `Authorization: Bearer <token>`.
3. Valid payment methods are only `cash` and `credit_card`.
4. Cash payment applies a 10% discount to the subtotal.
5. All data is in memory.

## Existent Data

The API starts with 3 users and 3 products.

### Initial Users

Passwords are shown in plain text here only for initial login convenience.

1. `alice@example.com` / `alice123`
2. `bruno@example.com` / `bruno123`
3. `carla@example.com` / `carla123`

### Initial Products

1. `id: 1` - Wireless Mouse - EUR 25.50
2. `id: 2` - Mechanical Keyboard - EUR 79.90
3. `id: 3` - USB-C Hub - EUR 44.00

## How to Use the Rest API

### 1) Healthcheck

```bash
curl -X GET http://localhost:3000/healthcheck
```

### Swagger Documentation

- Raw OpenAPI file: `GET /swagger`
- Interactive Swagger UI: `GET /docs` (redirects to `/docs/`)

```bash
curl -X GET http://localhost:3000/swagger
```

### 2) Register

```bash
curl -X POST http://localhost:3000/register \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Daniel Silva",
		"email": "daniel@example.com",
		"password": "daniel123"
	}'
```

### 3) Login

```bash
curl -X POST http://localhost:3000/login \
	-H "Content-Type: application/json" \
	-d '{
		"email": "alice@example.com",
		"password": "alice123"
	}'
```

The response returns a JWT token.

### 4) Checkout (authenticated)

Use the token from login/register in the `Authorization` header.

```bash
curl -X POST http://localhost:3000/checkout \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <JWT_TOKEN>" \
	-d '{
		"paymentMethod": "cash",
		"items": [
			{ "productId": 1, "quantity": 2 },
			{ "productId": 3, "quantity": 1 }
		]
	}'
```

For `cash`, the API returns `discount` as 10% of subtotal. For `credit_card`, discount is 0.
