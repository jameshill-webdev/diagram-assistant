import type { RequestHandler } from "express";
import { createError } from "./error.js";
import { ApiErrorCodes } from "./errorCodes.js";

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(
    createError("Route not found", 404, {
      name: "NotFoundError",
      code: ApiErrorCodes.ROUTE_NOT_FOUND,
      details: {
        method: request.method,
        path: request.originalUrl,
      },
    }),
  );
};
