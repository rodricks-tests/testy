"use client";

import { useEffect, useState } from "react";
import { fetchPaymentByAuction } from "@/features/payments/api/client";
import { PaymentStatusBanner } from "@/features/payments/components/PaymentStatusBanner";
import { PaymentMethodSelector } from "@/features/payments/components/PaymentMethodSelector";
import { BillingAddressForm } from "@/features/payments/components/BillingAddressForm";
import { CardElement } from "@/features/payments/components/CardElement";
import { OrderSummary } from "@/features/payments/components/OrderSummary";
import { CheckoutButton } from "@/features/payments/components/CheckoutButton";
import { ApplyCoupon } from "@/features/payments/components/ApplyCoupon";
import { useCheckoutDispatch, useCheckoutState } from "@/features/payments/services/state";
import { normalizeError, PaymentError } from "@/features/payments/services/errors";
import { usePaymentTelemetry } from "@/features/payments/hooks/usePaymentTelemetry";

interface CheckoutPageProps {
  auctionId: string;
  successUrl: string;
  cancelUrl: string;
}

export function CheckoutPage({ auctionId, successUrl, cancelUrl }: CheckoutPageProps) {
  const dispatch = useCheckoutDispatch();
  const telemetry = usePaymentTelemetry();
  const { summary } = useCheckoutState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PaymentError | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      telemetry.emit("payment.status.poll", { auctionId });
      try {
        const details = await fetchPaymentByAuction(auctionId);
        if (!active) return;
        dispatch({ type: "setSummary", payload: details });
        telemetry.emit("payment.status.updated", { auctionId, status: details.status });
      } catch (cause) {
        if (!active) return;
        const normalized = normalizeError(cause);
        setError(normalized);
        telemetry.emit("payment.error", {
          stage: "summary.load",
          message: normalized.message,
        });
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [auctionId, dispatch, telemetry]);

  async function handleApplyCoupon(code: string) {
    setCouponLoading(true);
    setCouponError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCouponError("Coupons are not yet supported for auction payments.");
    } finally {
      setCouponLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        {summary ? (
          <PaymentStatusBanner status={summary.status} updatedAt={summary.updatedAt} />
        ) : null}
        {error ? (
          <div className="rounded-md border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        ) : null}
        {loading ? <p className="text-sm text-muted-foreground">Loading checkout details…</p> : null}

        <PaymentMethodSelector />
        <CardElement />
        <BillingAddressForm />
        <ApplyCoupon onApply={handleApplyCoupon} applying={couponLoading} error={couponError} />
        <CheckoutButton auctionId={auctionId} successUrl={successUrl} cancelUrl={cancelUrl} />
      </div>
      <OrderSummary />
    </div>
  );
}

// Page layout respects guidance from Tailwind/05-layouts.md for responsive grids.
