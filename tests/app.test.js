const request = require("supertest");
const app = require("../index.js");

let server;

beforeAll((done) => {
  server = app.listen(0, () => {
    // Start the server on an available port
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    // Ensure the server is properly closed
    done();
  });
});

describe("API tests", () => {
  describe("GET /", () => {
    it("should return Hello World", async () => {
      const res = await request(server).get("/");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe("Hello World!");
    });
  });

  describe("GET /users", () => {
    it("should return a list of users", async () => {
      const res = await request(server).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("users");
      expect(res.body.users.length).toBe(2);
    });
  });

  describe("POST /users/add", () => {
    it("should add a user successfully", async () => {
      const res = await request(server).post("/users/add").send({ name: "Alice", age: 30 });
      expect(res.body).toHaveProperty("user");
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 400 if name or age is missing", async () => {
      const res = await request(server).post("/users/add").send({ name: "Alice" });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
