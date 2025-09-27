export class PaymentError extends Error {
  constructor(message: string, public readonly code?: string, public readonly causeError?: unknown) {
    super(message);
    this.name = "PaymentError";
  }
}

export function mapApiError(response: Response, body?: unknown): PaymentError {
  const defaultMessage = "Unable to process payment at this time. Please try again.";
  if (!response) return new PaymentError(defaultMessage);

  if (response.status === 401) {
    return new PaymentError("Authentication required. Please sign in again.", "auth");
  }

  if (response.status === 403) {
    return new PaymentError("You are not allowed to pay for this auction.", "forbidden");
  }

  if (response.status === 404) {
    return new PaymentError("We could not locate the payment record.", "not-found");
  }

  if (response.status === 409) {
    return new PaymentError("A payment attempt is already in progress.", "conflict");
  }

  if (typeof body === "string" && body.trim().length) {
    return new PaymentError(body.trim(), "server");
  }

  if (body && typeof body === "object" && "message" in (body as Record<string, unknown>)) {
    return new PaymentError(String((body as Record<string, unknown>).message), "server");
  }

  return new PaymentError(defaultMessage, "server");
}

export function normalizeError(error: unknown): PaymentError {
  if (error instanceof PaymentError) return error;
  if (error instanceof Error) {
    return new PaymentError(error.message, undefined, error);
  }
  return new PaymentError("Unexpected error", undefined, error);
}
