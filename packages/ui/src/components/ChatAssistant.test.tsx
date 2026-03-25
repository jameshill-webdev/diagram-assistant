import { fireEvent, render, screen } from "@testing-library/react";
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

  it("appends submitted messages and shows them in chronological order", () => {
    render(<ChatAssistant />);

    const messageInput = screen.getByLabelText(/message/i);
    const inputForm = screen.getByRole("form", {
      name: /chat assistant input/i,
    });

    fireEvent.change(messageInput, {
      target: { value: "First message" },
    });
    fireEvent.submit(inputForm);

    fireEvent.change(messageInput, {
      target: { value: "Second message" },
    });
    fireEvent.submit(inputForm);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("User: First message");
    expect(listItems[1]).toHaveTextContent("User: Second message");
    expect(screen.getAllByText("User:", { selector: "span" })).toHaveLength(2);
    expect(
      screen.queryByText(/no messages yet\. ask the assistant/i),
    ).not.toBeInTheDocument();
  });
});
