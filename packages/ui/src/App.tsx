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
  const [diagrams, setDiagrams] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitMessage = async (message: string) => {
    if (isSending) {
      return;
    }

    const userMessage: ConversationItem = { text: message, isUser: true };
    const nextConversation = [...conversation, userMessage];

    setConversation(nextConversation);
    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: nextConversation.map(
            (item) => `${item.isUser ? "User: " : "Assistant: "}${item.text}`,
          ),
          diagrams: diagrams,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = (await response.json()) as ChatApiResponse;

      setConversation((currentConversation) => [
        ...currentConversation,
        { text: responseData.message, isUser: false },
      ]);

      if (responseData.diagram) {
        setDiagrams((currentDiagrams) => [
          ...currentDiagrams,
          responseData.diagram,
        ]);
      }
    } catch (error) {
      const detail =
        error instanceof Error && error.message
          ? ` ${error.message}`
          : " Please try again.";

      setErrorMessage(`Could not reach the assistant.${detail}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main>
      <h1 className={styles.srOnly}>Diagram Assistant</h1>
      {errorMessage ? (
        <section>
          <p role="alert" id="error" className={styles.error}>
            <strong>Error:</strong> {errorMessage}
          </p>
        </section>
      ) : null}
      <div className={styles.twoColumnLayout}>
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
          <DiagramWorkspace diagramMarkup={diagrams[diagrams.length - 1]} />
        </section>
      </div>
    </main>
  );
}

export default App;
