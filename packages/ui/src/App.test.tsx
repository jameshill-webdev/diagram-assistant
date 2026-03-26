import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    render: vi
      .fn()
      .mockResolvedValue({ svg: "<svg><text>rendered</text></svg>" }),
  },
}));

describe("App", () => {
  const fetchMock = vi.fn();

  beforeAll(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

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

  it("sends full conversation to /chat and applies response to chat and diagram", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Assistant response one",
          diagram: "graph TD; A-->B",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Assistant response two",
          diagram: "graph TD; B-->C",
        }),
      });

    render(<App />);

    const messageInput = screen.getByLabelText(/message/i);
    const inputForm = screen.getByRole("form", {
      name: /chat assistant input/i,
    });

    fireEvent.change(messageInput, { target: { value: "First user message" } });
    fireEvent.submit(inputForm);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ input: ["First user message"], diagrams: [] }),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Assistant response one")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /mermaid diagram/i }),
      ).toBeInTheDocument();
    });

    fireEvent.change(messageInput, {
      target: { value: "Second user message" },
    });
    fireEvent.submit(inputForm);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          input: [
            "First user message",
            "Assistant response one",
            "Second user message",
          ],
          diagrams: ["graph TD; A-->B"],
        }),
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Assistant response two")).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: /mermaid diagram/i }),
      ).toBeInTheDocument();
    });
  });

  it("shows request errors in a dedicated alert element", async () => {
    fetchMock.mockRejectedValueOnce(new Error("There was a problem"));

    render(<App />);

    const messageInput = screen.getByLabelText(/message/i);
    const inputForm = screen.getByRole("form", {
      name: /chat assistant input/i,
    });

    fireEvent.change(messageInput, { target: { value: "Please help" } });
    fireEvent.submit(inputForm);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Could not reach the assistant. There was a problem",
      );
    });

    const chatOutput = screen.getByText(/user:/i).closest("div");
    expect(chatOutput).not.toBeNull();
    expect(
      within(chatOutput as HTMLElement).getAllByRole("listitem"),
    ).toHaveLength(1);
  });
});
