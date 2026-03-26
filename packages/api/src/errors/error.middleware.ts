import type { ErrorRequestHandler } from "express";
import { createError, isApiError } from "./error.js";
import { ApiErrorCodes } from "./errorCodes.js";
import type { ApiErrorResponse } from "./types.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  const apiError = isApiError(error)
    ? error
    : createError("Internal server error", 500, {
        name: "InternalServerError",
        code: ApiErrorCodes.INTERNAL_ERROR,
      });

  const payload: ApiErrorResponse = {
    success: false,
    message: apiError.message,
    ...(apiError.code ? { code: apiError.code } : {}),
    ...(apiError.details ? { details: apiError.details } : {}),
  };

  response.status(apiError.statusCode).json(payload);
};
