import { describe, expect, it, vi } from "vitest";
import { createCheckoutSession } from "@/features/payments/api/client";
import { PaymentError } from "@/features/payments/services/errors";

vi.mock("@/lib/api", () => ({
  fetchWithAuth: vi.fn(),
}));

const { fetchWithAuth } = require("@/lib/api");

describe("createCheckoutSession", () => {
  it("extracts the session id from the checkout url", async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ url: "https://checkout.stripe.com/c/pay/cs_test_123" }),
    });

    const result = await createCheckoutSession({
      auctionId: "abc",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
      idempotencyKey: "key",
    });

    expect(result.sessionId).toBe("cs_test_123");
  });

  it("throws a mapped payment error on failure", async () => {
    fetchWithAuth.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "Not found" }),
    });

    await expect(
      createCheckoutSession({
        auctionId: "abc",
        successUrl: "s",
        cancelUrl: "c",
        idempotencyKey: "key",
      })
    ).rejects.toBeInstanceOf(PaymentError);
  });
});
