"use client";

import { useEffect, useState } from "react";
import { fetchPaymentByAuction, fetchPaymentById } from "@/features/payments/api/client";
import { PaymentStatusBanner } from "@/features/payments/components/PaymentStatusBanner";
import { OrderSummary } from "@/features/payments/components/OrderSummary";
import { useCheckoutDispatch, useCheckoutState } from "@/features/payments/services/state";
import { normalizeError, PaymentError } from "@/features/payments/services/errors";
import { usePaymentTelemetry } from "@/features/payments/hooks/usePaymentTelemetry";

interface OrderConfirmationPageProps {
  paymentId?: string;
  auctionId?: string;
}

export function OrderConfirmationPage({ paymentId, auctionId }: OrderConfirmationPageProps) {
  const dispatch = useCheckoutDispatch();
  const { summary } = useCheckoutState();
  const telemetry = usePaymentTelemetry();
  const [error, setError] = useState<PaymentError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setError(null);
      setLoading(true);
      const target = paymentId ?? auctionId;
      telemetry.emit("payment.status.poll", { paymentId, auctionId });
      try {
        const details = paymentId
          ? await fetchPaymentById(paymentId)
          : await (async () => {
              if (!auctionId) throw new PaymentError("Missing payment reference");
              return fetchPaymentByAuction(auctionId);
            })();
        if (!active) return;
        dispatch({ type: "setSummary", payload: details });
        telemetry.emit("payment.status.updated", {
          paymentId: details.id,
          status: details.status,
          reference: target,
        });
      } catch (cause) {
        if (!active) return;
        const normalized = normalizeError(cause);
        setError(normalized);
        telemetry.emit("payment.error", {
          stage: "confirmation.load",
          message: normalized.message,
        });
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [dispatch, paymentId, telemetry]);

  const reference = paymentId ?? auctionId ?? "";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">Payment confirmation</h1>
        <p className="text-sm text-muted-foreground">
          We keep this page updated automatically. If you close it, you can revisit from your orders list.
        </p>
        <p className="text-xs text-muted-foreground">Reference: {reference}</p>
      </div>
      {loading ? <p className="text-sm text-muted-foreground">Checking payment status…</p> : null}
      {error ? (
        <div className="rounded-md border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      ) : null}
      {summary ? (
        <div className="space-y-4">
          <PaymentStatusBanner status={summary.status} updatedAt={summary.updatedAt} />
          {summary.receiptUrl ? (
            <a
              href={summary.receiptUrl}
              className="inline-flex text-sm font-medium text-gold-middle underline"
              target="_blank"
              rel="noreferrer"
            >
              View Stripe receipt
            </a>
          ) : null}
          <OrderSummary />
        </div>
      ) : null}
    </div>
  );
}

// Polling cadence informed by React/52-useeffect.md (cleaning intervals).
