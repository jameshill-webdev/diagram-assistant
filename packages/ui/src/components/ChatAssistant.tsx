export function ChatAssistant() {
  return (
    <div className="chat-assistant">
      <div className="panel-header">
        <h1 id="chat-assistant-heading">Chat Assistant</h1>
      </div>

      <div className="chat-output" aria-live="polite">
        <p>
          No messages yet. Ask the assistant to help build or refine a diagram.
        </p>
      </div>

      <form className="chat-input" aria-label="Chat assistant input">
        <label className="chat-label" htmlFor="chat-message">
          Message
        </label>
        <textarea
          id="chat-message"
          name="message"
          rows={6}
          placeholder="Describe the diagram you want to create..."
        />
        <div className="chat-actions">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
