import request from "supertest";
import { app } from "../../app";
import { Server } from "node:http";
import jwt from "jsonwebtoken";

jest.mock("../../src/repository/callLog.repository");

const token = jwt.sign({}, process.env.JWT_SECRET as string);

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
