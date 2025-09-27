"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createStripeAdapter } from "@/features/payments/adapters/stripe";
import type {
  PaymentAdapter,
  PaymentAdapterConfig,
} from "@/features/payments/types";
import { usePaymentTelemetry } from "@/features/payments/hooks/usePaymentTelemetry";

const adapterFactories = {
  stripe: createStripeAdapter,
};

type SupportedAdapter = keyof typeof adapterFactories;

interface PaymentProviderState {
  status: "idle" | "loading" | "ready" | "error";
  error?: string;
}

interface PaymentProviderProps extends PaymentAdapterConfig {
  provider?: SupportedAdapter;
  children: ReactNode;
}

const PaymentAdapterContext = createContext<PaymentAdapter | null>(null);
const PaymentAdapterStateContext = createContext<PaymentProviderState>({
  status: "idle",
});

export function PaymentProvider({
  provider = "stripe",
  publishableKey,
  locale,
  children,
}: PaymentProviderProps) {
  const telemetry = usePaymentTelemetry();
  const [state, setState] = useState<PaymentProviderState>({ status: "idle" });
  const [adapter, setAdapter] = useState<PaymentAdapter | null>(null);

  const factory = useMemo(() => adapterFactories[provider], [provider]);

  useEffect(() => {
    let cancelled = false;
    const instance = factory();

    async function initialise() {
      setState({ status: "loading" });
      telemetry.emit("adapter.init", { provider });
      try {
        await instance.init({ publishableKey, locale });
        if (!cancelled) {
          setAdapter(instance);
          setState({ status: "ready" });
        }
      } catch (error) {
        console.error("Failed to initialise payment adapter", error);
        if (!cancelled) {
          setState({ status: "error", error: (error as Error).message });
          telemetry.emit("payment.error", {
            stage: "adapter.init",
            provider,
            message: (error as Error).message,
          });
        }
      }
    }

    initialise();

    return () => {
      cancelled = true;
    };
  }, [factory, publishableKey, locale, provider, telemetry]);

  const contextValue = useMemo(() => adapter, [adapter]);

  return (
    <PaymentAdapterStateContext.Provider value={state}>
      <PaymentAdapterContext.Provider value={contextValue}>
        {children}
      </PaymentAdapterContext.Provider>
    </PaymentAdapterStateContext.Provider>
  );
}

export function usePaymentAdapter(): PaymentAdapter {
  const adapter = useContext(PaymentAdapterContext);
  if (!adapter) {
    throw new Error(
      "Payment adapter not ready. Wrap the tree with <PaymentProvider>."
    );
  }
  return adapter;
}

export function usePaymentAdapterState(): PaymentProviderState {
  return useContext(PaymentAdapterStateContext);
}

// State management mirrors React patterns from React/36-managing-state.md.
