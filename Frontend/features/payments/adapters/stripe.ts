"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import type {
  CheckoutIntentPayload,
  CheckoutIntentResult,
  PaymentAdapter,
  PaymentAdapterConfig,
  PaymentConfirmationResult,
} from "@/features/payments/types";
import {
  PaymentError,
  normalizeError,
} from "@/features/payments/services/errors";
import { createCheckoutSession } from "@/features/payments/api/client";

function assertConfig(config: PaymentAdapterConfig | null): asserts config is PaymentAdapterConfig {
  if (!config) {
    throw new PaymentError("Stripe adapter not initialised", "config");
  }
}

function extractStripeError(error: unknown): PaymentError {
  const normalized = normalizeError(error);
  if (normalized.code) return normalized;
  return new PaymentError(normalized.message, "stripe", normalized);
}

async function redirectToCheckout(
  stripe: Stripe,
  result: CheckoutIntentResult
): Promise<void> {
  if (result.sessionId) {
    const { error } = await stripe.redirectToCheckout({ sessionId: result.sessionId });
    if (error) {
      throw new PaymentError(error.message, error.type);
    }
  } else if (typeof window !== "undefined") {
    window.location.assign(result.sessionUrl);
  }
}

export function createStripeAdapter(): PaymentAdapter {
  let stripePromise: Promise<Stripe | null> | null = null;
  let config: PaymentAdapterConfig | null = null;

  async function ensureStripe(): Promise<Stripe> {
    assertConfig(config);
    if (!stripePromise) {
      stripePromise = loadStripe(config.publishableKey, {
        locale: config.locale,
      });
    }
    const stripe = await stripePromise;
    if (!stripe) {
      throw new PaymentError("Unable to initialise Stripe.js", "stripe-init");
    }
    return stripe;
  }

  return {
    id: "stripe",
    async init(nextConfig) {
      config = nextConfig;
      await ensureStripe();
    },
    async createPayment(payload: CheckoutIntentPayload): Promise<CheckoutIntentResult> {
      try {
        const session = await createCheckoutSession(payload);
        const stripe = await ensureStripe();
        await redirectToCheckout(stripe, session);
        return session;
      } catch (error) {
        throw extractStripeError(error);
      }
    },
    async confirmPayment(): Promise<PaymentConfirmationResult> {
      throw new PaymentError(
        "Direct confirmation is not supported for Stripe Checkout sessions.",
        "unsupported"
      );
    },
    async handle3DS(): Promise<PaymentConfirmationResult> {
      throw new PaymentError(
        "3DS challenges are handled inside the hosted Stripe Checkout flow.",
        "unsupported"
      );
    },
    async saveMethod() {
      throw new PaymentError(
        "Saving payment methods is not enabled for Stripe Checkout sessions.",
        "unsupported"
      );
    },
    async listMethods() {
      return [];
    },
    async detachMethod() {
      throw new PaymentError("Detaching methods is not available.", "unsupported");
    },
    async refund() {
      throw new PaymentError(
        "Refunds must be initiated from the seller dashboard in this release.",
        "unsupported"
      );
    },
  };
}

// Styling and UX expectations match Tailwind/07-styling-with-utility-classes.md guidance.
