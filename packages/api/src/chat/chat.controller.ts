import { processChat as processChatGpt } from "./chat.service.gpt.js";
import { processChat as processChatClaudeSonnet } from "./chat.service.claude-sonnet.js";

export interface ChatRequest {
  input: string[];
}

export interface ChatResponse {
  diagram: string;
  message: string;
}

export function handleChat(body: ChatRequest): ChatResponse {
  const model = process.env.CHAT_MODEL;

  if (model === "claude-sonnet") {
    return processChatClaudeSonnet(body);
  }

  return processChatGpt(body);
}
