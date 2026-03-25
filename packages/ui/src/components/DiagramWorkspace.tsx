import styles from "./DiagramWorkspace.module.css";

type DiagramWorkspaceProps = {
  diagramMarkup: string;
};

export function DiagramWorkspace({ diagramMarkup }: DiagramWorkspaceProps) {
  return (
    <div className={styles.diagramWorkspace}>
      <div className="panel-header">
        <h2 id="diagram-workspace-heading">Diagram Workspace</h2>
      </div>

      <div className={styles.diagramContainer}>
        {diagramMarkup ? (
          <pre>{diagramMarkup}</pre>
        ) : (
          <p>Your diagram canvas will appear here.</p>
        )}
      </div>
    </div>
  );
}
