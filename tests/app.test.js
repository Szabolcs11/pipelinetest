const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  return res.status(200).json({
    users: [
      { name: "John", age: 25 },
      { name: "Jane", age: 24 },
    ],
  });
});

app.post("/users/add", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({
      message: "Please provide name and age",
    });
  }
  return res.status(201).json({
    success: false,
    message: "User added successfully",
    user: { name, age },
  });
});

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World!");
  });
});

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("users");
    expect(res.body.users.length).toBe(2);
  });
});

describe("POST /users/add", () => {
  it("should add a user successfully", async () => {
    const res = await request(app).post("/users/add").send({ name: "Alice", age: 30 });
    expect(res.body).toHaveProperty("user");
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  it("should return 400 if name or age is missing", async () => {
    const res = await request(app).post("/users/add").send({ name: "Alice" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});
