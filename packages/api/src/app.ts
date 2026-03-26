import express from "express";
import chatRouter from "./chat/chat.router.js";
import { errorHandler } from "./errors/error.middleware.js";
import { notFoundHandler } from "./errors/notFound.middleware.js";

const app = express();

app.use(express.json());

app.use("/chat", chatRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
