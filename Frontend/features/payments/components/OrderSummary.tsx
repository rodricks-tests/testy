"use client";

import { useCheckoutState } from "@/features/payments/services/state";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

export function OrderSummary() {
  const { summary } = useCheckoutState();
  if (!summary) {
    return (
      <aside className="rounded-lg border border-stone-200 bg-white px-4 py-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Order details will appear once the auction data loads.</p>
      </aside>
    );
  }

  const baseAmount = summary.totalAmount - summary.commission;
  const total = summary.totalAmount;

  return (
    <aside className="rounded-lg border border-stone-200 bg-white px-4 py-5 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Order summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Winning bid</dt>
          <dd className="font-medium text-foreground">{formatCurrency(baseAmount, summary.currency)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Platform commission</dt>
          <dd className="font-medium text-foreground">{formatCurrency(summary.commission, summary.currency)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-stone-200 pt-3 text-base">
          <dt className="font-semibold text-foreground">Total due</dt>
          <dd className="font-semibold text-foreground">{formatCurrency(total, summary.currency)}</dd>
        </div>
      </dl>
    </aside>
  );
}

// Summary layout inspired by Tailwind/05-layouts.md examples.
