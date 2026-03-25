import { FormEvent, useState } from "react";
import styles from "./ChatAssistant.module.css";

type ConversationItem = {
  text: string;
  isUser: boolean;
};

export function ChatAssistant() {
  const [conversation, setConversation] = useState<ConversationItem[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const messageField = new FormData(form).get("message");
    const message = typeof messageField === "string" ? messageField.trim() : "";

    if (!message) {
      return;
    }

    setConversation((currentConversation) => [
      ...currentConversation,
      { text: message, isUser: true },
    ]);
    form.reset();
  };

  return (
    <div className={styles.chatAssistant}>
      <div className="panel-header">
        <h1 id="chat-assistant-heading">Chat Assistant</h1>
      </div>

      <div className={styles.chatOutput} aria-live="polite">
        {conversation.length === 0 ? (
          <p>
            No messages yet. Ask the assistant to help build or refine a
            diagram.
          </p>
        ) : (
          <ul>
            {conversation.map((item, index) => (
              <li key={`${index}-${item.text}`}>
                {item.isUser ? <span>User:</span> : null} {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        className={styles.chatInput}
        aria-label="Chat assistant input"
        onSubmit={handleSubmit}
      >
        <label className={styles.chatLabel} htmlFor="chat-message">
          Message
        </label>
        <textarea
          id="chat-message"
          name="message"
          rows={6}
          placeholder="Describe the diagram you want to create..."
        />
        <div className={styles.chatActions}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
