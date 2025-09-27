"use client";

import { ChangeEvent } from "react";
import { useCheckoutDispatch, useCheckoutState } from "@/features/payments/services/state";

const emptyAddress = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export function BillingAddressForm() {
  const dispatch = useCheckoutDispatch();
  const state = useCheckoutState();
  const address = state.billingAddress ?? emptyAddress;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch({ type: "setBilling", payload: { ...address, [name]: value } });
  }

  return (
    <section aria-labelledby="billing-heading" className="space-y-4">
      <h2 id="billing-heading" className="text-lg font-semibold text-foreground">
        Billing details
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Full name</span>
          <input
            name="name"
            value={address.name}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            required
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Email</span>
          <input
            name="email"
            type="email"
            value={address.email}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            required
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Phone</span>
          <input
            name="phone"
            value={address.phone ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="tel"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Address line 1</span>
          <input
            name="line1"
            value={address.line1 ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="address-line1"
            required
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Address line 2</span>
          <input
            name="line2"
            value={address.line2 ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="address-line2"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">City</span>
          <input
            name="city"
            value={address.city ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="address-level2"
            required
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">State/Province</span>
          <input
            name="state"
            value={address.state ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="address-level1"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 font-medium text-foreground">Postal code</span>
          <input
            name="postalCode"
            value={address.postalCode ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="postal-code"
            required
          />
        </label>
        <label className="flex flex-col text-sm md:col-span-2">
          <span className="mb-1 font-medium text-foreground">Country</span>
          <input
            name="country"
            value={address.country ?? ""}
            onChange={handleChange}
            className="rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
            autoComplete="country"
            required
          />
        </label>
      </div>
    </section>
  );
}

// Form controls styled per Tailwind/09-forms.md guidance.
