import { render, screen } from "@testing-library/react";
import { DiagramWorkspace } from "./DiagramWorkspace";

describe("DiagramWorkspace", () => {
  it("renders the workspace heading and empty-state canvas message", () => {
    render(<DiagramWorkspace />);

    expect(
      screen.getByRole("heading", { name: /diagram workspace/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/your diagram canvas will appear here/i),
    ).toBeInTheDocument();
  });
});
