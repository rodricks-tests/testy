"use client";

import { useEffect, useState } from "react";
import { usePaymentAdapter } from "@/features/payments/PaymentProvider";
import type { PaymentMethodSummary } from "@/features/payments/types";

export function usePaymentMethods() {
  const adapter = usePaymentAdapter();
  const [methods, setMethods] = useState<PaymentMethodSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await adapter.listMethods();
        if (active) {
          setMethods(data);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [adapter]);

  return { methods, loading };
}
