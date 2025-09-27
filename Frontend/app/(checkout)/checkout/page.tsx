"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentProvider } from "@/features/payments/PaymentProvider";
import { CheckoutStateProvider } from "@/features/payments/services/state";
import { PaymentTelemetryProvider } from "@/features/payments/services/telemetry";
import { CheckoutPage } from "@/features/payments/pages/CheckoutPage";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function CheckoutRoute() {
  const searchParams = useSearchParams();
  const auctionId = searchParams.get("auctionId");

  const origin = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  const successUrl = useMemo(() => {
    if (!origin || !auctionId) return "";
    return `${origin}/orders/${auctionId}?type=auction`;
  }, [origin, auctionId]);

  const cancelUrl = useMemo(() => {
    if (!origin || !auctionId) return "";
    return `${origin}/auction/${auctionId}?checkout=cancelled`;
  }, [origin, auctionId]);

  if (!publishableKey) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-16">
        <h1 className="text-2xl font-semibold text-foreground">Payments unavailable</h1>
        <p className="text-sm text-muted-foreground">
          The Stripe publishable key is not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment.
        </p>
      </div>
    );
  }

  if (!auctionId) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-16">
        <h1 className="text-2xl font-semibold text-foreground">Missing auction</h1>
        <p className="text-sm text-muted-foreground">Provide an auctionId query parameter to continue.</p>
      </div>
    );
  }

  return (
    <PaymentTelemetryProvider>
      <PaymentProvider publishableKey={publishableKey}>
        <CheckoutStateProvider>
          <main className="mx-auto max-w-5xl px-4 py-10">
            <CheckoutPage auctionId={auctionId} successUrl={successUrl} cancelUrl={cancelUrl} />
          </main>
        </CheckoutStateProvider>
      </PaymentProvider>
    </PaymentTelemetryProvider>
  );
}
