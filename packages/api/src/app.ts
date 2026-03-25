import express from "express";
import chatRouter from "./chat/chat.router.js";

const app = express();

app.use(express.json());

app.use("/chat", chatRouter);

export default app;
