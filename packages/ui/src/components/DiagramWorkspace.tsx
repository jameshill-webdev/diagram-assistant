import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";
import styles from "./DiagramWorkspace.module.css";

mermaid.initialize({ startOnLoad: false });

type DiagramWorkspaceProps = {
  diagramMarkup: string;
};

export function DiagramWorkspace({ diagramMarkup }: DiagramWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const diagramId = `mermaid-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    if (!diagramMarkup || !containerRef.current) {
      return;
    }

    mermaid.render(diagramId, diagramMarkup).then(({ svg }) => {
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    });
  }, [diagramMarkup, diagramId]);

  return (
    <div className={styles.diagramWorkspace}>
      <div className="panel-header">
        <h2 id="diagram-workspace-heading">Diagram Workspace</h2>
      </div>

      <div className={styles.diagramContainer}>
        {diagramMarkup ? (
          <div ref={containerRef} role="img" aria-label="mermaid diagram" />
        ) : (
          <p>Your diagram canvas will appear here.</p>
        )}
      </div>
    </div>
  );
}
