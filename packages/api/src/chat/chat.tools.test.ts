import { describe, expect, it } from "vitest";
import { executeTool } from "./chat.tools.js";

describe("executeTool", () => {
  it("returns Mermaid markup for a sequence diagram tool call", () => {
    const result = executeTool({
      toolName: "generateDiagram",
      args: {
        diagramType: "sequence",
        prompt: "create a sequence diagram",
      },
    });

    expect(result.diagram).toMatch(/^sequenceDiagram/);
  });

  it("returns Mermaid markup for a branching flowchart tool call", () => {
    const result = executeTool({
      toolName: "generateDiagram",
      args: {
        diagramType: "branching",
        prompt: "show me a flow chart",
      },
    });

    expect(result.diagram).toMatch(/^flowchart TD/);
  });

  it("returns Mermaid markup for a simple flowchart tool call", () => {
    const result = executeTool({
      toolName: "generateDiagram",
      args: {
        diagramType: "simple",
        prompt: "generate a chart",
      },
    });

    expect(result.diagram).toMatch(/^flowchart LR/);
  });
});
