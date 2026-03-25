import { processChat as processChatGpt } from "./chat.service.gpt.js";
import { processChat as processChatClaudeSonnet } from "./chat.service.claude-sonnet.js";
import type { DiagramType } from "./chat.types.js";

export interface ChatRequest {
  input: string[];
  diagrams: string[];
}

export interface ChatResponse {
  diagram: string;
  message: string;
}

function detectDiagramType(inputs: string[]): DiagramType {
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

export function handleChat(body: ChatRequest): ChatResponse {
  const model = process.env.CHAT_MODEL;
  const diagramType = detectDiagramType(body.input);

  if (model === "claude-sonnet") {
    return processChatClaudeSonnet(body, diagramType);
  }

  return processChatGpt(body, diagramType);
}
