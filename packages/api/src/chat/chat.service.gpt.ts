import type { ChatRequest, ChatResponse } from "./chat.controller.js";
import type { DiagramType } from "./chat.types.js";

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

export function processChat(
  _body: ChatRequest,
  diagramType: DiagramType,
): ChatResponse {
  if (diagramType === "sequence") {
    return {
      diagram: SEQUENCE_DIAGRAM,
      message: "Here is your sequence diagram from GPT.",
    };
  }
  if (diagramType === "branching") {
    return {
      diagram: BRANCHING_FLOWCHART,
      message: "Here is your branching flowchart from GPT.",
    };
  }
  if (diagramType === "simple") {
    return {
      diagram: SIMPLE_FLOWCHART,
      message: "Here is your simple flowchart from GPT.",
    };
  }
  return { diagram: "", message: "No diagram type detected from GPT." };
}
