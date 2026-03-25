import request from "supertest";
import app from "../app.js";

describe("POST /chat", () => {
  it("accepts an array of strings and returns diagram and message", async () => {
    const response = await request(app)
      .post("/chat")
      .send({ messages: ["hello", "world"] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("diagram");
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.diagram).toBe("string");
    expect(typeof response.body.message).toBe("string");
  });
});
