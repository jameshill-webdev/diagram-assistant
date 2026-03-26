import type { DiagramType, GenerateDiagramToolCall } from "./chat.types.js";

const SEQUENCE_DIAGRAM = `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    Bob-->>Alice: I am good, thanks!
    Alice->>Bob: Great to hear!`;

const BRANCHING_FLOWCHART = `flowchart TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No --> E[End]`;

const SIMPLE_FLOWCHART = `flowchart LR
    A[Start] --> B[Do something]
    B --> C[End]`;

function generateDiagram(diagramType: DiagramType): string {
  if (diagramType === "sequence") {
    return SEQUENCE_DIAGRAM;
  }

  if (diagramType === "branching") {
    return BRANCHING_FLOWCHART;
  }

  return SIMPLE_FLOWCHART;
}

export function executeTool(toolCall: GenerateDiagramToolCall): {
  diagram: string;
} {
  if (toolCall.toolName === "generateDiagram") {
    return {
      diagram: generateDiagram(toolCall.args.diagramType),
    };
  }

  return { diagram: "" };
}
