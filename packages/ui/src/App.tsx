import { useState } from "react";
import { ChatAssistant } from "./components/ChatAssistant";
import type { ConversationItem } from "./components/ChatAssistant";
import { DiagramWorkspace } from "./components/DiagramWorkspace";
import styles from "./App.module.css";

type ChatApiResponse = {
  diagram: string;
  message: string;
};

function App() {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [diagramMarkup, setDiagramMarkup] = useState("");
  const [diagrams, setDiagrams] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSubmitMessage = async (message: string) => {
    if (isSending) {
      return;
    }

    const userEntry: ConversationItem = { text: message, isUser: true };
    const nextConversation = [...conversation, userEntry];

    setConversation(nextConversation);
    setIsSending(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: nextConversation.map((item) => item.text),
          diagrams: diagrams,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ChatApiResponse;

      setConversation((currentConversation) => [
        ...currentConversation,
        { text: data.message, isUser: false },
      ]);

      // Add diagram to history array if it's not empty
      if (data.diagram) {
        setDiagrams((currentDiagrams) => [...currentDiagrams, data.diagram]);
      }
      setDiagramMarkup(data.diagram);
    } catch {
      setConversation((currentConversation) => [
        ...currentConversation,
        {
          text: "Could not reach the assistant. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={styles.appShell}>
      <section
        className={`${styles.panel} ${styles.panelChat}`}
        aria-labelledby="chat-assistant-heading"
      >
        <ChatAssistant
          conversation={conversation}
          onSubmitMessage={handleSubmitMessage}
          isSending={isSending}
        />
      </section>

      <section
        className={styles.panel}
        aria-labelledby="diagram-workspace-heading"
      >
        <DiagramWorkspace diagramMarkup={diagramMarkup} />
      </section>
    </main>
  );
}

export default App;
