"use client";

import type { PaymentStatus } from "@/features/payments/types";

interface PaymentStatusBannerProps {
  status: PaymentStatus;
  updatedAt?: string | null;
}

const styles: Record<PaymentStatus, { label: string; className: string; description: string }> = {
  pending: {
    label: "Payment pending",
    className: "border-amber-400 bg-amber-50 text-amber-800",
    description: "We are preparing your payment. You can refresh in a moment.",
  },
  processing: {
    label: "Processing",
    className: "border-sky-400 bg-sky-50 text-sky-800",
    description: "Stripe is confirming the payment. This usually takes a few seconds.",
  },
  completed: {
    label: "Payment completed",
    className: "border-emerald-500 bg-emerald-50 text-emerald-800",
    description: "Funds have been captured successfully.",
  },
  failed: {
    label: "Payment failed",
    className: "border-red-500 bg-red-50 text-red-700",
    description: "The payment was declined. Try another method or contact support.",
  },
  refunded: {
    label: "Refunded",
    className: "border-purple-500 bg-purple-50 text-purple-800",
    description: "The payment was refunded to your card.",
  },
  disputed: {
    label: "Disputed",
    className: "border-orange-500 bg-orange-50 text-orange-800",
    description: "The payment is under dispute. Our team will reach out with next steps.",
  },
};

export function PaymentStatusBanner({ status, updatedAt }: PaymentStatusBannerProps) {
  const config = styles[status] ?? styles.pending;
  return (
    <div
      role="status"
      className={`rounded-md border px-4 py-3 text-sm ${config.className}`}
    >
      <p className="font-semibold">{config.label}</p>
      <p>{config.description}</p>
      {updatedAt ? (
        <p className="mt-1 text-xs opacity-80">Last updated {new Date(updatedAt).toLocaleString()}</p>
      ) : null}
    </div>
  );
}

// Status messaging follows accessibility notes from React/28-accessibility.md.
