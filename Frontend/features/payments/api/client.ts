import { BASE_URL } from "@/config";
import { fetchWithAuth } from "@/lib/api";
import type {
  CheckoutIntentPayload,
  CheckoutIntentResult,
  PaymentStatus,
  PaymentSummary,
} from "@/features/payments/types";
import { mapApiError, PaymentError } from "@/features/payments/services/errors";

function toPaymentSummary(data: any): PaymentSummary {
  if (!data) {
    throw new PaymentError("Payment response malformed", "invalid-response");
  }
  const status = String(data.status ?? "pending").toLowerCase() as PaymentStatus;
  return {
    id: String(data.id),
    bidId: String(data.bidId),
    totalAmount: Number(data.totalAmount ?? 0),
    commission: Number(data.commission ?? 0),
    currency: String(data.currency ?? "usd"),
    status,
    receiptUrl: data.receiptUrl ?? null,
    paidAt: data.paidAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

function extractSessionIdFromUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const candidate = segments[segments.length - 1];
    if (candidate?.startsWith("cs_")) {
      return candidate;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function createCheckoutSession(
  payload: CheckoutIntentPayload
): Promise<CheckoutIntentResult> {
  const response = await fetchWithAuth(`${BASE_URL}/api/Payment/checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": payload.idempotencyKey,
    },
    body: JSON.stringify({
      auctionId: payload.auctionId,
      successUrl: payload.successUrl,
      cancelUrl: payload.cancelUrl,
      billingAddress: payload.billingAddress,
    }),
  });

  if (!response.ok) {
    let body: unknown = undefined;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw mapApiError(response, body);
  }

  const data = await response.json();
  const url = String(data.url);
  return {
    sessionUrl: url,
    sessionId: extractSessionIdFromUrl(url),
    paymentId: data.paymentId ?? undefined,
  };
}

export async function fetchPaymentByBid(bidId: string): Promise<PaymentSummary> {
  const response = await fetchWithAuth(`${BASE_URL}/api/Payment/bid/${bidId}`);
  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw mapApiError(response, body);
  }
  const data = await response.json();
  return toPaymentSummary(data);
}

export async function fetchPaymentById(id: string): Promise<PaymentSummary> {
  const response = await fetchWithAuth(`${BASE_URL}/api/Payment/${id}`);
  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw mapApiError(response, body);
  }
  const data = await response.json();
  return toPaymentSummary(data);
}

export async function fetchPaymentByAuction(
  auctionId: string
): Promise<PaymentSummary> {
  const response = await fetchWithAuth(
    `${BASE_URL}/api/Payment/auction/${auctionId}`
  );
  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw mapApiError(response, body);
  }
  const data = await response.json();
  return toPaymentSummary(data);
}
