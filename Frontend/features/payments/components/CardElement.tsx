"use client";

import { ShieldCheck } from "lucide-react";

export function CardElement() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white px-4 py-5 shadow-sm">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-5 w-5 text-gold-middle" aria-hidden="true" />
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">Card details collected securely</p>
          <p className="text-muted-foreground">
            We redirect you to Stripe Checkout to enter your card, following their hosted payment fields. No card
            numbers touch our servers, satisfying PCI guidance.
          </p>
        </div>
      </div>
    </div>
  );
}

// Accessibility guidance follows React/28-accessibility.md.
