import { Router } from "express";
import { handleChat } from "./chat.controller.js";

const router = Router();

router.route("/").post((request, response) => {
  const chatResponse = handleChat(request.body);
  response.json(chatResponse);
});

export default router;
