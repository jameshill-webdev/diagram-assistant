import { fireEvent, render, screen } from "@testing-library/react";
import { ChatAssistant } from "./ChatAssistant";
import type { ConversationItem } from "./ChatAssistant";

describe("ChatAssistant", () => {
  it("renders the heading, message area, and input controls", () => {
    render(
      <ChatAssistant
        conversation={[]}
        onSubmitMessage={vi.fn()}
        isSending={false}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /chat assistant/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no messages yet\. ask the assistant/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls submit callback and shows provided conversation in chronological order", () => {
    const onSubmitMessage = vi.fn();
    const conversation: ConversationItem[] = [
      { text: "First message", isUser: true },
      { text: "Assistant reply", isUser: false },
    ];

    render(
      <ChatAssistant
        conversation={conversation}
        onSubmitMessage={onSubmitMessage}
        isSending={false}
      />,
    );

    const messageInput = screen.getByLabelText(/message/i);
    const inputForm = screen.getByRole("form", {
      name: /chat assistant input/i,
    });

    fireEvent.change(messageInput, {
      target: { value: "New user message" },
    });
    fireEvent.submit(inputForm);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("User: First message");
    expect(listItems[1]).toHaveTextContent("Assistant reply");
    expect(screen.getAllByText("User:", { selector: "span" })).toHaveLength(1);
    expect(
      screen.queryByText(/no messages yet\. ask the assistant/i),
    ).not.toBeInTheDocument();
    expect(onSubmitMessage).toHaveBeenCalledTimes(1);
    expect(onSubmitMessage).toHaveBeenCalledWith("New user message");
  });
});
