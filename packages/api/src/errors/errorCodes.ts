export const ApiErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ApiErrorCode = (typeof ApiErrorCodes)[keyof typeof ApiErrorCodes];
