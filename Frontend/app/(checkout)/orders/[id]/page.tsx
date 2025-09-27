"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PaymentProvider } from "@/features/payments/PaymentProvider";
import { CheckoutStateProvider } from "@/features/payments/services/state";
import { PaymentTelemetryProvider } from "@/features/payments/services/telemetry";
import { OrderConfirmationPage } from "@/features/payments/pages/OrderConfirmationPage";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function OrderConfirmationRoute() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const sessionId = searchParams.get("session_id");

  const referenceId = params?.id ?? "";
  const paymentId = type === "auction" ? undefined : referenceId;
  const auctionId = type === "auction" ? referenceId : undefined;

  const computedPaymentId = useMemo(() => {
    if (paymentId) return paymentId;
    if (sessionId) return sessionId;
    return undefined;
  }, [paymentId, sessionId]);

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

  return (
    <PaymentTelemetryProvider>
      <PaymentProvider publishableKey={publishableKey}>
        <CheckoutStateProvider>
          <main className="mx-auto max-w-4xl px-4 py-10">
            <OrderConfirmationPage paymentId={computedPaymentId} auctionId={auctionId} />
          </main>
        </CheckoutStateProvider>
      </PaymentProvider>
    </PaymentTelemetryProvider>
  );
}
