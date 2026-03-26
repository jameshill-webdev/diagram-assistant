import { processChat as processChatGpt } from "./chat.service.gpt.js";
import { processChat as processChatClaudeSonnet } from "./chat.service.claude-sonnet.js";
import { executeTool } from "./chat.tools.js";
import type {
  ChatRequest,
  ChatResponse,
  ProviderDecision,
} from "./chat.types.js";

function resolveDecision(body: ChatRequest): ProviderDecision {
  const model = process.env.CHAT_MODEL;

  if (model === "claude-sonnet") {
    return processChatClaudeSonnet(body);
  }

  return processChatGpt(body);
}

export function handleChat(body: ChatRequest): ChatResponse {
  const decision = resolveDecision(body);

  if (decision.type === "text") {
    return {
      diagram: "",
      message: decision.responseMessage,
    };
  }

  const toolResult = executeTool(decision.toolCall);

  return {
    diagram: toolResult.diagram,
    message: decision.responseMessage,
  };
}
