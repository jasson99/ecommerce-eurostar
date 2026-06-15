import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://127.0.0.1:3000";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const payload = JSON.stringify({
    email: "alice@example.com",
    password: "alice123",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    tags: {
      endpoint: "POST /login",
    },
  };

  const response = http.post(`${BASE_URL}/login`, payload, params);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response has token": (r) => !!r.json("token"),
    "response email is alice@example.com": (r) =>
      r.json("user.email") === "alice@example.com",
  });
}
