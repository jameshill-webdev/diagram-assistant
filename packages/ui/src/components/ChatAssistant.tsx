import styles from "./ChatAssistant.module.css";

export function ChatAssistant() {
  return (
    <div className={styles.chatAssistant}>
      <div className="panel-header">
        <h1 id="chat-assistant-heading">Chat Assistant</h1>
      </div>

      <div className={styles.chatOutput} aria-live="polite">
        <p>
          No messages yet. Ask the assistant to help build or refine a diagram.
        </p>
      </div>

      <form className={styles.chatInput} aria-label="Chat assistant input">
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
