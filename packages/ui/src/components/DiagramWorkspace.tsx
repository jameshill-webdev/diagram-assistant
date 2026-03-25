import styles from "./DiagramWorkspace.module.css";

export function DiagramWorkspace() {
  return (
    <div className={styles.diagramWorkspace}>
      <div className="panel-header">
        <h2 id="diagram-workspace-heading">Diagram Workspace</h2>
      </div>

      <div className={styles.diagramContainer}>
        <p>Your diagram canvas will appear here.</p>
      </div>
    </div>
  );
}
