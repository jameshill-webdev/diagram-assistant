import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import * as gptService from "./chat.service.gpt.js";
import * as claudeService from "./chat.service.claude-sonnet.js";

const mockRequest = { input: ["hello"] };

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
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest, "none");
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });

  it("calls the Claude Sonnet service when CHAT_MODEL is 'claude-sonnet'", async () => {
    process.env.CHAT_MODEL = "claude-sonnet";
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(claudeService.processChat).toHaveBeenCalledWith(mockRequest, "none");
    expect(gptService.processChat).not.toHaveBeenCalled();
  });

  it("defaults to the GPT service when CHAT_MODEL is unset", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest, "none");
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });

  it("detects a sequence diagram request before calling GPT", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat({ input: ["create a sequence diagram"] });

    expect(gptService.processChat).toHaveBeenCalledWith(
      { input: ["create a sequence diagram"] },
      "sequence",
    );
  });

  it("detects a branching diagram request before calling GPT", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat({ input: ["show a flow chart"] });

    expect(gptService.processChat).toHaveBeenCalledWith(
      { input: ["show a flow chart"] },
      "branching",
    );
  });

  it("detects a simple diagram request before calling GPT", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat({ input: ["generate a diagram"] });

    expect(gptService.processChat).toHaveBeenCalledWith(
      { input: ["generate a diagram"] },
      "simple",
    );
  });

  it("uses newest-first matching when detecting the diagram type", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat({ input: ["create a diagram", "now a flow"] });

    expect(gptService.processChat).toHaveBeenCalledWith(
      { input: ["create a diagram", "now a flow"] },
      "branching",
    );
  });

  it("only checks the most recent message when detecting the diagram type", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat({ input: ["create a sequence diagram", "thanks!"] });

    expect(gptService.processChat).toHaveBeenCalledWith(
      { input: ["create a sequence diagram", "thanks!"] },
      "none",
    );
  });
});
