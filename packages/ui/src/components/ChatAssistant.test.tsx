import { render, screen } from "@testing-library/react";
import { ChatAssistant } from "./ChatAssistant";

describe("ChatAssistant", () => {
  it("renders the heading, message area, and input controls", () => {
    render(<ChatAssistant />);

    expect(
      screen.getByRole("heading", { name: /chat assistant/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no messages yet\. ask the assistant/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });
});
