import { describe, it, expect } from "vitest";
import { processChat } from "./chat.service.gpt.js";

describe("processChat (gpt service)", () => {
  describe("sequence diagram", () => {
    it("returns a generateDiagram tool call for sequence requests", () => {
      const result = processChat({
        input: ["create a sequence diagram"],
        diagrams: [],
      });

      expect(result).toEqual({
        type: "tool_call",
        responseMessage: "Here is your sequence diagram from GPT.",
        toolCall: {
          toolName: "generateDiagram",
          args: {
            diagramType: "sequence",
            prompt: "create a sequence diagram",
          },
        },
      });
    });
  });

  describe("branching flowchart", () => {
    it("returns a generateDiagram tool call for branching requests", () => {
      const result = processChat({
        input: ["show me a flow chart"],
        diagrams: [],
      });

      expect(result).toEqual({
        type: "tool_call",
        responseMessage: "Here is your branching flowchart from GPT.",
        toolCall: {
          toolName: "generateDiagram",
          args: {
            diagramType: "branching",
            prompt: "show me a flow chart",
          },
        },
      });
    });
  });

  describe("simple flowchart", () => {
    it("returns a generateDiagram tool call for simple requests", () => {
      const result = processChat({
        input: ["GENERATE a chart"],
        diagrams: [],
      });

      expect(result).toEqual({
        type: "tool_call",
        responseMessage: "Here is your simple flowchart from GPT.",
        toolCall: {
          toolName: "generateDiagram",
          args: {
            diagramType: "simple",
            prompt: "GENERATE a chart",
          },
        },
      });
    });
  });

  describe("no match fallback", () => {
    it("returns a text decision when no diagram type is detected", () => {
      const result = processChat({ input: ["hello there"], diagrams: [] });

      expect(result).toEqual({
        type: "text",
        responseMessage: "No diagram type detected from GPT.",
      });
    });

    it("only checks the most recent message when detecting a diagram request", () => {
      const result = processChat({
        input: ["create a sequence diagram", "thanks!"],
        diagrams: [],
      });

      expect(result).toEqual({
        type: "text",
        responseMessage: "No diagram type detected from GPT.",
      });
    });
  });
});
