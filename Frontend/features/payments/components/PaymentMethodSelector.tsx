"use client";

import { useEffect } from "react";
import { useCheckoutDispatch, useCheckoutState } from "@/features/payments/services/state";
import { usePaymentMethods } from "@/features/payments/hooks/usePaymentMethods";
import type { PaymentMethodSummary } from "@/features/payments/types";

function MethodRow({
  method,
  selected,
  onSelect,
}: {
  method: PaymentMethodSummary;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <label
      className={`flex items-center justify-between rounded-md border px-4 py-3 transition focus-within:ring-2 focus-within:ring-gold-middle ${
        selected ? "border-gold-middle shadow-sm" : "border-stone-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment-method"
          value={method.id}
          checked={selected}
          onChange={() => onSelect(method.id)}
          className="h-4 w-4 text-gold-middle"
          aria-label={`${method.brand ?? method.type} ending in ${method.last4 ?? "????"}`}
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium text-foreground">
            {method.brand ?? "Card"} •••• {method.last4 ?? "????"}
          </span>
          {method.expMonth && method.expYear ? (
            <span className="text-muted-foreground">Expires {method.expMonth}/{method.expYear}</span>
          ) : null}
        </div>
      </div>
      {method.isDefault ? (
        <span className="rounded-full bg-gold-middle/10 px-3 py-1 text-xs text-gold-middle">
          Default
        </span>
      ) : null}
    </label>
  );
}

export function PaymentMethodSelector() {
  const { methods, loading } = usePaymentMethods();
  const dispatch = useCheckoutDispatch();
  const state = useCheckoutState();

  useEffect(() => {
    dispatch({ type: "setMethods", payload: methods });
  }, [methods, dispatch]);

  return (
    <section aria-labelledby="payment-method-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="payment-method-heading" className="text-lg font-semibold text-foreground">
          Payment method
        </h2>
        {loading ? <span className="text-sm text-muted-foreground">Loading…</span> : null}
      </div>

      <div className="space-y-3">
        {state.availableMethods.length > 0 ? (
          state.availableMethods.map((method) => (
            <MethodRow
              key={method.id}
              method={method}
              selected={state.selectedMethodId === method.id}
              onSelect={(id) => dispatch({ type: "selectMethod", payload: id })}
            />
          ))
        ) : (
          <p className="rounded-md border border-dashed border-gold-middle/50 bg-white px-4 py-3 text-sm text-muted-foreground">
            You can add a new card safely on the Stripe checkout screen. Saved methods will appear here
            once available.
          </p>
        )}
      </div>
    </section>
  );
}

// UI styling references Tailwind/07-styling-with-utility-classes.md.
