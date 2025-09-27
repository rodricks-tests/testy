"use client";

import { useTelemetrySink } from "@/features/payments/services/telemetry";
import type { PaymentTelemetryEvent } from "@/features/payments/types";

export function usePaymentTelemetry() {
  const sink = useTelemetrySink();
  return {
    emit(name: PaymentTelemetryEvent["name"], properties?: Record<string, unknown>) {
      sink.emit(name, properties);
    },
  };
}
