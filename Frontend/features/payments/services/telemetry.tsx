"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import type { PaymentTelemetryEvent } from "@/features/payments/types";

type TelemetrySink = {
  emit: (name: PaymentTelemetryEvent["name"], properties?: Record<string, unknown>) => void;
};

const noopSink: TelemetrySink = {
  emit: () => {
    // intentionally empty
  },
};

const PaymentTelemetryContext = createContext<TelemetrySink>(noopSink);

interface PaymentTelemetryProviderProps {
  children: ReactNode;
  sink?: TelemetrySink;
}

export function PaymentTelemetryProvider({
  children,
  sink,
}: PaymentTelemetryProviderProps) {
  const value = useMemo(() => {
    if (sink) return sink;
    return {
      emit: (name: PaymentTelemetryEvent["name"], properties?: Record<string, unknown>) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[payments.telemetry]", name, properties);
        }
      },
    } satisfies TelemetrySink;
  }, [sink]);

  return (
    <PaymentTelemetryContext.Provider value={value}>
      {children}
    </PaymentTelemetryContext.Provider>
  );
}

export function useTelemetrySink(): TelemetrySink {
  return useContext(PaymentTelemetryContext);
}
