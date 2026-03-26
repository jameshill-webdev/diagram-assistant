import { describe, it, expect } from "vitest";
import { processChat } from "./chat.service.gpt.js";

describe("processChat (gpt service)", () => {
  describe("sequence diagram", () => {
    it("returns a sequence diagram when the controller passes 'sequence'", () => {
      const result = processChat(
        {
          input: ["create a sequence diagram"],
          diagrams: [],
        },
        "sequence",
      );
      expect(result.diagram).toMatch(/^sequenceDiagram/);
    });

    it("returns the sequence diagram message", () => {
      const result = processChat(
        {
          input: ["SEQUENCE please"],
          diagrams: [],
        },
        "sequence",
      );
      expect(result.diagram).toMatch(/^sequenceDiagram/);
      expect(result.message).toBe("Here is your sequence diagram from GPT.");
    });
  });

  describe("branching flowchart", () => {
    it("returns a branching flowchart when the controller passes 'branching'", () => {
      const result = processChat(
        {
          input: ["show me a flow chart"],
          diagrams: [],
        },
        "branching",
      );
      expect(result.diagram).toMatch(/^flowchart TD/);
    });

    it("returns the branching flowchart message", () => {
      const result = processChat(
        { input: ["FLOW please"], diagrams: [] },
        "branching",
      );
      expect(result.diagram).toMatch(/^flowchart TD/);
      expect(result.message).toBe("Here is your branching flowchart from GPT.");
    });
  });

  describe("simple flowchart", () => {
    it("returns a simple flowchart when the controller passes 'simple'", () => {
      const result = processChat(
        { input: ["create something"], diagrams: [] },
        "simple",
      );
      expect(result.diagram).toMatch(/^flowchart LR/);
    });

    it("returns the simple flowchart message", () => {
      const result = processChat(
        { input: ["GENERATE a chart"], diagrams: [] },
        "simple",
      );
      expect(result.diagram).toMatch(/^flowchart LR/);
      expect(result.message).toBe("Here is your simple flowchart from GPT.");
    });
  });

  describe("no match fallback", () => {
    it("returns an empty diagram when the controller passes 'none'", () => {
      const result = processChat(
        { input: ["hello there"], diagrams: [] },
        "none",
      );
      expect(result.diagram).toBe("");
      expect(result.message).toBe("No diagram type detected from GPT.");
    });

    it("returns an empty diagram even when request input is empty", () => {
      const result = processChat({ input: [], diagrams: [] }, "none");
      expect(result.diagram).toBe("");
    });
  });
});
