import type {
  ChatRequest,
  DetectedDiagramType,
  ProviderDecision,
} from "./chat.types.js";

function detectDiagramType(inputs: string[]): DetectedDiagramType {
  const latestInput = inputs.at(-1);
  if (!latestInput) {
    return "none";
  }

  const lowerCaseInput = latestInput.toLowerCase();
  if (lowerCaseInput.includes("sequence")) {
    return "sequence";
  }
  if (lowerCaseInput.includes("flow")) {
    return "branching";
  }
  if (
    lowerCaseInput.includes("create") ||
    lowerCaseInput.includes("generate") ||
    lowerCaseInput.includes("diagram")
  ) {
    return "simple";
  }

  return "none";
}

export function processChat(body: ChatRequest): ProviderDecision {
  const latestInput = body.input.at(-1) ?? "";
  const diagramType = detectDiagramType(body.input);

  if (diagramType === "sequence") {
    return {
      type: "tool_call",
      responseMessage: "Here is your sequence diagram from Claude Sonnet.",
      toolCall: {
        toolName: "generateDiagram",
        args: {
          diagramType,
          prompt: latestInput,
        },
      },
    };
  }
  if (diagramType === "branching") {
    return {
      type: "tool_call",
      responseMessage: "Here is your branching flowchart from Claude Sonnet.",
      toolCall: {
        toolName: "generateDiagram",
        args: {
          diagramType,
          prompt: latestInput,
        },
      },
    };
  }
  if (diagramType === "simple") {
    return {
      type: "tool_call",
      responseMessage: "Here is your simple flowchart from Claude Sonnet.",
      toolCall: {
        toolName: "generateDiagram",
        args: {
          diagramType,
          prompt: latestInput,
        },
      },
    };
  }

  return {
    type: "text",
    responseMessage: "No diagram type detected from Claude Sonnet.",
  };
}
