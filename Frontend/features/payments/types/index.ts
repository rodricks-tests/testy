export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"
  | "disputed";

export interface PaymentSummary {
  id: string;
  bidId: string;
  totalAmount: number;
  commission: number;
  currency: string;
  status: PaymentStatus;
  receiptUrl?: string | null;
  paidAt?: string | null;
  updatedAt?: string | null;
}

export interface BillingAddress {
  name: string;
  email: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface CheckoutIntentPayload {
  auctionId: string;
  successUrl: string;
  cancelUrl: string;
  idempotencyKey: string;
  billingAddress?: BillingAddress;
}

export interface CheckoutIntentResult {
  sessionUrl: string;
  sessionId?: string;
  paymentId?: string;
}

export interface PaymentMethodSummary {
  id: string;
  type: "card" | "wallet" | "bank";
  brand?: string;
  last4?: string;
  expMonth?: number;
  expYear?: number;
  isDefault?: boolean;
}

export interface PaymentAdapterConfig {
  publishableKey: string;
  locale?: string;
}

export interface PaymentConfirmationResult {
  paymentId?: string;
  status: PaymentStatus;
  receiptUrl?: string | null;
}

export interface PaymentAdapter {
  id: "stripe" | string;
  init(config: PaymentAdapterConfig): Promise<void>;
  createPayment(payload: CheckoutIntentPayload): Promise<CheckoutIntentResult>;
  confirmPayment(clientSecret: string): Promise<PaymentConfirmationResult>;
  handle3DS(clientSecret: string): Promise<PaymentConfirmationResult>;
  saveMethod(): Promise<PaymentMethodSummary>;
  listMethods(): Promise<PaymentMethodSummary[]>;
  detachMethod(methodId: string): Promise<void>;
  refund(paymentId: string, reason?: string): Promise<void>;
}

export interface PaymentTelemetryEvent {
  name:
    | "adapter.init"
    | "checkout.intent.requested"
    | "checkout.intent.ready"
    | "checkout.intent.failed"
    | "checkout.redirect"
    | "payment.status.poll"
    | "payment.status.updated"
    | "payment.error";
  properties?: Record<string, unknown>;
}
