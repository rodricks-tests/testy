"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";

interface ApplyCouponProps {
  onApply: (code: string) => Promise<void> | void;
  applying?: boolean;
  error?: string | null;
}

export function ApplyCoupon({ onApply, applying = false, error }: ApplyCouponProps) {
  const [code, setCode] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) return;
    await onApply(code.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2" aria-label="Apply coupon">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Coupon code"
          className="flex-1 rounded-md border border-stone-200 px-3 py-2 shadow-sm focus:border-gold-middle focus:outline-none focus:ring-2 focus:ring-gold-middle"
        />
        <Button type="submit" variant="primary" disabled={applying}>
          {applying ? "Applying…" : "Apply"}
        </Button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}

// Form layout references Tailwind/07-styling-with-utility-classes.md.
