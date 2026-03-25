import { ChatAssistant } from "./components/ChatAssistant";
import { DiagramWorkspace } from "./components/DiagramWorkspace";

function App() {
  return (
    <main className="app-shell">
      <section
        className="panel panel-chat"
        aria-labelledby="chat-assistant-heading"
      >
        <ChatAssistant />
      </section>

      <section
        className="panel panel-workspace"
        aria-labelledby="diagram-workspace-heading"
      >
        <DiagramWorkspace />
      </section>
    </main>
  );
}

export default App;
