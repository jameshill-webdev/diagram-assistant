import { render, screen } from "@testing-library/react";
import { DiagramWorkspace } from "./DiagramWorkspace";

describe("DiagramWorkspace", () => {
  it("renders the workspace heading and empty-state canvas message", () => {
    render(<DiagramWorkspace diagramMarkup="" />);

    expect(
      screen.getByRole("heading", { name: /diagram workspace/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/your diagram canvas will appear here/i),
    ).toBeInTheDocument();
  });

  it("renders diagram markup when provided", () => {
    render(<DiagramWorkspace diagramMarkup="graph TD; A-->B" />);

    expect(screen.getByText("graph TD; A-->B")).toBeInTheDocument();
    expect(
      screen.queryByText(/your diagram canvas will appear here/i),
    ).not.toBeInTheDocument();
  });
});
