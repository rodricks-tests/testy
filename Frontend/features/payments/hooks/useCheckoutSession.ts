"use client";

import { useCallback, useState } from "react";
import { usePaymentAdapter } from "@/features/payments/PaymentProvider";
import { normalizeError, PaymentError } from "@/features/payments/services/errors";
import type { CheckoutIntentPayload } from "@/features/payments/types";
import { usePaymentTelemetry } from "@/features/payments/hooks/usePaymentTelemetry";

export function useCheckoutSession() {
  const adapter = usePaymentAdapter();
  const telemetry = usePaymentTelemetry();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PaymentError | null>(null);

  const startCheckout = useCallback(
    async (payload: CheckoutIntentPayload) => {
      setLoading(true);
      setError(null);
      telemetry.emit("checkout.intent.requested", { provider: adapter.id });
      try {
        const result = await adapter.createPayment(payload);
        telemetry.emit("checkout.redirect", {
          provider: adapter.id,
          sessionId: result.sessionId,
        });
        return result;
      } catch (cause) {
        const normalized = normalizeError(cause);
        setError(normalized);
        telemetry.emit("checkout.intent.failed", {
          provider: adapter.id,
          code: normalized.code,
        });
        throw normalized;
      } finally {
        setLoading(false);
      }
    },
    [adapter, telemetry]
  );

  return { startCheckout, loading, error };
}

// Hook API follows React/33-responding-to-events.md for event-driven flows.
