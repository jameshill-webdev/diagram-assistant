import { ChatAssistant } from "./components/ChatAssistant";
import { DiagramWorkspace } from "./components/DiagramWorkspace";
import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.appShell}>
      <section
        className={`${styles.panel} ${styles.panelChat}`}
        aria-labelledby="chat-assistant-heading"
      >
        <ChatAssistant />
      </section>

      <section
        className={styles.panel}
        aria-labelledby="diagram-workspace-heading"
      >
        <DiagramWorkspace />
      </section>
    </main>
  );
}

export default App;
