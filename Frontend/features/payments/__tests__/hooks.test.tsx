import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PaymentProvider } from "@/features/payments/PaymentProvider";
import { CheckoutStateProvider } from "@/features/payments/services/state";
import { PaymentTelemetryProvider } from "@/features/payments/services/telemetry";
import { useCheckoutSession } from "@/features/payments/hooks/useCheckoutSession";

const createPaymentMock = vi.fn(async () => ({ sessionUrl: "https://example.com", sessionId: "cs_test" }));
const telemetryMock = { emit: vi.fn() };

vi.mock("@/features/payments/adapters/stripe", () => ({
  createStripeAdapter: () => ({
    id: "stripe",
    init: vi.fn(async () => undefined),
    createPayment: createPaymentMock,
    confirmPayment: vi.fn(),
    handle3DS: vi.fn(),
    saveMethod: vi.fn(),
    listMethods: vi.fn(async () => []),
    detachMethod: vi.fn(),
    refund: vi.fn(),
  }),
}));

describe("useCheckoutSession", () => {
  it("invokes the adapter and telemetry", async () => {
    function TestComponent() {
      const { startCheckout, loading, error } = useCheckoutSession();
      return (
        <div>
          <button
            onClick={() =>
              startCheckout({
                auctionId: "auction",
                successUrl: "https://example.com/success",
                cancelUrl: "https://example.com/cancel",
                idempotencyKey: "key",
              })
            }
            disabled={loading}
          >
            Checkout
          </button>
          {error ? <p role="alert">{error.message}</p> : null}
        </div>
      );
    }

    render(
      <PaymentTelemetryProvider sink={telemetryMock}>
        <PaymentProvider publishableKey="pk_test">
          <CheckoutStateProvider>
            <TestComponent />
          </CheckoutStateProvider>
        </PaymentProvider>
      </PaymentTelemetryProvider>
    );

    const button = await screen.findByText("Checkout");
    fireEvent.click(button);

    await waitFor(() => {
      expect(createPaymentMock).toHaveBeenCalled();
    });

    expect(telemetryMock.emit).toHaveBeenCalledWith("checkout.intent.requested", {
      provider: "stripe",
    });
  });
});
