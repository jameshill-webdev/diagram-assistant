import type { ChatRequest, ChatResponse } from "./chat.controller.js";

export function processChat(body: ChatRequest): ChatResponse {
  return {
    diagram: "Sample diagram",
    message: "Hello from chat endpoint (claude-sonnet model)",
  };
}
