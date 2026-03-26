import request from "supertest";
import app from "../app.js";

describe("POST /chat", () => {
  it("accepts an array of strings and returns diagram and message", async () => {
    const response = await request(app)
      .post("/chat")
      .send({ input: ["hello", "world"], diagrams: [] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("diagram");
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.diagram).toBe("string");
    expect(typeof response.body.message).toBe("string");
  });

  it("returns a structured 404 for unknown routes", async () => {
    const response = await request(app).get("/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Route not found",
      code: "ROUTE_NOT_FOUND",
      details: {
        method: "GET",
        path: "/does-not-exist",
      },
    });
  });

  it("returns a structured 404 for unsupported methods", async () => {
    const response = await request(app).get("/chat");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Route not found",
      code: "ROUTE_NOT_FOUND",
      details: {
        method: "GET",
        path: "/chat",
      },
    });
  });

  it("returns a structured 500 for unexpected errors", async () => {
    const response = await request(app).post("/chat").send({ diagrams: [] });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_ERROR",
    });
  });
});
