import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DiagramWorkspace } from "./DiagramWorkspace";

vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    render: vi
      .fn()
      .mockResolvedValue({ svg: "<svg><text>rendered</text></svg>" }),
  },
}));

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

  it("renders a mermaid diagram in the container when markup is provided", () => {
    render(<DiagramWorkspace diagramMarkup="graph TD; A-->B" />);

    expect(
      screen.getByRole("img", { name: /mermaid diagram/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/your diagram canvas will appear here/i),
    ).not.toBeInTheDocument();
  });
});
