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

    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });

  it("calls the Claude Sonnet service when CHAT_MODEL is 'claude-sonnet'", async () => {
    process.env.CHAT_MODEL = "claude-sonnet";
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(claudeService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(gptService.processChat).not.toHaveBeenCalled();
  });

  it("defaults to the GPT service when CHAT_MODEL is unset", async () => {
    const { handleChat } = await import("./chat.controller.js");

    handleChat(mockRequest);

    expect(gptService.processChat).toHaveBeenCalledWith(mockRequest);
    expect(claudeService.processChat).not.toHaveBeenCalled();
  });
});
