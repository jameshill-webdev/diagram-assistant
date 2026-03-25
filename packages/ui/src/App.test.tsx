import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the application shell with chat and workspace panels", () => {
    render(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();

    const chatPanel = screen.getByRole("region", { name: /chat assistant/i });
    const workspacePanel = screen.getByRole("region", {
      name: /diagram workspace/i,
    });

    expect(chatPanel).toBeInTheDocument();
    expect(workspacePanel).toBeInTheDocument();
  });
});
