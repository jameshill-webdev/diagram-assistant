import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import * as gptService from "./chat.service.gpt.js";
import * as claudeService from "./chat.service.claude-sonnet.js";

const mockRequest = { input: ["hello"], diagrams: [] };

describe("handleChat", () => {
  beforeEach(() => {
    vi.spyOn(gptService, "processChat");
    vi.spyOn(claudeService, "processChat");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.CHAT_MODEL;
  });

  it("calls the GPT service when CHAT_MODEL is 'gpt'", async () => {
    process.env.CHAT_MODEL = "gpt";
    vi.mocked(gptService.processChat).mockReturnValue({
      type: "text",
      responseMessage: "No diagram type detected from GPT.",
    });
    const { handleChat } = await import("./chat.controller.js");

    const result = handleChat(mockRequest);

    expect(result).toEqual({
      diagram: "",
      message: "No diagram type detected from GPT.",
    });
    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });

  it("calls the Claude Sonnet service when CHAT_MODEL is 'claude-sonnet'", async () => {
    process.env.CHAT_MODEL = "claude-sonnet";
    vi.mocked(claudeService.processChat).mockReturnValue({
      type: "text",
      responseMessage: "No diagram type detected from Claude Sonnet.",
    });
    const { handleChat } = await import("./chat.controller.js");

    const result = handleChat(mockRequest);

    expect(result).toEqual({
      diagram: "",
      message: "No diagram type detected from Claude Sonnet.",
    });
    expect(claudeService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(gptService.processChat).not.toHaveBeenCalled();
  });

  it("defaults to the GPT service when CHAT_MODEL is unset", async () => {
    vi.mocked(gptService.processChat).mockReturnValue({
      type: "text",
      responseMessage: "No diagram type detected from GPT.",
    });
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });

  it("executes a tool call from the GPT service and returns the tool result", async () => {
    vi.mocked(gptService.processChat).mockReturnValue({
      type: "tool_call",
      responseMessage: "Here is your simple flowchart from GPT.",
      toolCall: {
        toolName: "generateDiagram",
        args: {
          diagramType: "simple",
          prompt: "generate a diagram",
        },
      },
    });
    const { handleChat } = await import("./chat.controller.js");

    const result = handleChat({
      input: ["generate a diagram"],
      diagrams: [],
    });

    expect(result.message).toBe("Here is your simple flowchart from GPT.");
    expect(result.diagram).toMatch(/^flowchart LR/);
  });

  it("returns text responses from the provider without executing a tool", async () => {
    vi.mocked(gptService.processChat).mockReturnValue({
      type: "text",
      responseMessage: "No diagram type detected from GPT.",
    });
    const { handleChat } = await import("./chat.controller.js");

    const result = handleChat({ input: ["hello there"], diagrams: [] });

    expect(result).toEqual({
      diagram: "",
      message: "No diagram type detected from GPT.",
    });
  });
});
