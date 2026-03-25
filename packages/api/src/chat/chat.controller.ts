export interface ChatRequest {
  input: string[];
}

export interface ChatResponse {
  diagram: string;
  message: string;
}

export function handleChat(body: ChatRequest): ChatResponse {
  const input = body.input || [];

  // Return hardcoded response for now
  return {
    diagram: "Sample diagram",
    message: "Hello from chat endpoint",
  };
}
