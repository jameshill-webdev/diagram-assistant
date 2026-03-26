export interface ChatRequest {
  input: string[];
  diagrams: string[];
}

export interface ChatResponse {
  diagram: string;
  message: string;
}

export type DiagramType = "sequence" | "branching" | "simple";
export type DetectedDiagramType = DiagramType | "none";

export interface GenerateDiagramToolArgs {
  diagramType: DiagramType;
  prompt: string;
}

export interface GenerateDiagramToolCall {
  toolName: "generateDiagram";
  args: GenerateDiagramToolArgs;
}

export interface TextDecision {
  type: "text";
  responseMessage: string;
}

export interface ToolCallDecision {
  type: "tool_call";
  responseMessage: string;
  toolCall: GenerateDiagramToolCall;
}

export type ProviderDecision = TextDecision | ToolCallDecision;
