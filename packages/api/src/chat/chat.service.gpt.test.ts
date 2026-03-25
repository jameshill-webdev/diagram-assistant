import { describe, it, expect } from "vitest";
import { processChat } from "./chat.service.gpt.js";

describe("processChat (gpt service)", () => {
  describe("sequence diagram", () => {
    it("returns a sequence diagram when the controller passes 'sequence'", () => {
      const result = processChat(
        { input: ["create a sequence diagram"] },
        "sequence",
      );
      expect(result.diagram).toMatch(/^sequenceDiagram/);
    });

    it("returns the sequence diagram message", () => {
      const result = processChat({ input: ["SEQUENCE please"] }, "sequence");
      expect(result.diagram).toMatch(/^sequenceDiagram/);
      expect(result.message).toBe("Here is your sequence diagram.");
    });
  });

  describe("branching flowchart", () => {
    it("returns a branching flowchart when the controller passes 'branching'", () => {
      const result = processChat(
        { input: ["show me a flow chart"] },
        "branching",
      );
      expect(result.diagram).toMatch(/^flowchart TD/);
    });

    it("returns the branching flowchart message", () => {
      const result = processChat({ input: ["FLOW please"] }, "branching");
      expect(result.diagram).toMatch(/^flowchart TD/);
      expect(result.message).toBe("Here is your branching flowchart.");
    });
  });

  describe("simple flowchart", () => {
    it("returns a simple flowchart when the controller passes 'simple'", () => {
      const result = processChat({ input: ["create something"] }, "simple");
      expect(result.diagram).toMatch(/^flowchart LR/);
    });

    it("returns the simple flowchart message", () => {
      const result = processChat({ input: ["GENERATE a chart"] }, "simple");
      expect(result.diagram).toMatch(/^flowchart LR/);
      expect(result.message).toBe("Here is your flowchart.");
    });
  });

  describe("no match fallback", () => {
    it("returns an empty diagram when the controller passes 'none'", () => {
      const result = processChat({ input: ["hello there"] }, "none");
      expect(result.diagram).toBe("");
      expect(result.message).toBe("No diagram type detected.");
    });

    it("returns an empty diagram even when request input is empty", () => {
      const result = processChat({ input: [] }, "none");
      expect(result.diagram).toBe("");
    });
  });
});
