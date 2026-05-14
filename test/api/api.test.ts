import request from "supertest";
import { app } from "../../src/api/api";
import { Server } from "node:http";
import jwt from "jsonwebtoken";

jest.mock("../../src/repository/sum.repository");
jest.mock("../../src/repository/callLog.repository");

const token = jwt.sign({}, process.env.JWT_SECRET as string);

describe("POST /api/sumNumber/", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(6000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return sum of top N digits when valid body is sent", async () => {
    // Given
    const body = { ch: "123456", n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(200);
    expect(res.body.data).toBe(15);
  });

  it("should return sum of all digits when n equals string length", async () => {
    // Given
    const body = { ch: "123", n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(200);
    expect(res.body.data).toBe(6);
  });

  it("should return 400 when extra fields are sent", async () => {
    // Given
    const body = { ch: "123", n: 3, aa: "" };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when ch is missing", async () => {
    // Given
    const body = { n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when n is missing", async () => {
    // Given
    const body = { ch: "123" };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when body is empty", async () => {
    // Given
    const body = {};

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when ch contains letters", async () => {
    // Given
    const body = { ch: "12a3", n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("ch must be a numeric string");
  });

  it("should return 400 when ch is null", async () => {
    // Given
    const body = { ch: null, n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when ch is empty string", async () => {
    // Given
    const body = { ch: "", n: 3 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when n is 0", async () => {
    // Given
    const body = { ch: "123", n: 0 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("n must be a positive integer");
  });

  it("should return 400 when n is negative", async () => {
    // Given
    const body = { ch: "123", n: -1 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("n must be a positive integer");
  });

  it("should return 400 when n is null", async () => {
    // Given
    const body = { ch: "123", n: null };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid request body");
  });

  it("should return 400 when n exceeds string length", async () => {
    // Given
    const body = { ch: "123", n: 5 };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("n cannot exceed the length of ch");
  });

  it("should return 400 when n is a string", async () => {
    // Given
    const body = { ch: "123", n: "3" };

    // When
    const res = await request(app)
      .post("/api/sumNumber")
      .set("Authorization", `Bearer ${token}`)
      .send(body);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("n must be a positive integer");
  });
});

describe("GET /api/calls-history/", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(6001);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return all call logs when no query param is sent", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(200);
  });

  it("should return call logs filtered by status=success", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history?status=success")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(200);
  });

  it("should return call logs filtered by status=failed", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history?status=failed")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(200);
  });

  it("should return 400 when status is invalid", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history?status=invalid")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("status must be success or failed");
  });
});

describe("GET /api/calls-history/:id", () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(6002);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return 404 when call log is not found", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history/9999")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("call log not found");
  });

  it("should return 400 when id is 0", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history/0")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("call id must be a positive integer");
  });

  it("should return 400 when id is negative", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history/-1")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("call id must be a positive integer");
  });

  it("should return 400 when id is not a number", async () => {
    // Given / When
    const res = await request(app)
      .get("/api/calls-history/abc")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("call id must be a positive integer");
  });
});
