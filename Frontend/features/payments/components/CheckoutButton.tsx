"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCheckoutSession } from "@/features/payments/hooks/useCheckoutSession";
import { useCheckoutState } from "@/features/payments/services/state";
import { PaymentError } from "@/features/payments/services/errors";

interface CheckoutButtonProps {
  auctionId: string;
  successUrl: string;
  cancelUrl: string;
}

export function CheckoutButton({ auctionId, successUrl, cancelUrl }: CheckoutButtonProps) {
  const { startCheckout, loading } = useCheckoutSession();
  const { billingAddress } = useCheckoutState();
  const [error, setError] = useState<PaymentError | null>(null);

  async function handleClick() {
    setError(null);
    try {
      await startCheckout({
        auctionId,
        successUrl,
        cancelUrl,
        idempotencyKey: crypto.randomUUID(),
        billingAddress: billingAddress ?? undefined,
      });
    } catch (err) {
      setError(err as PaymentError);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="primary"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? "Redirecting to Stripe…" : "Pay securely"}
      </Button>
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}

// Button uses interaction guidance from Tailwind/03-essentials.md.
