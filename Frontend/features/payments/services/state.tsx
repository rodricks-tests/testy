"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type {
  BillingAddress,
  PaymentMethodSummary,
  PaymentSummary,
} from "@/features/payments/types";

interface CheckoutState {
  selectedMethodId: string | null;
  availableMethods: PaymentMethodSummary[];
  billingAddress: BillingAddress | null;
  summary: PaymentSummary | null;
  couponCode: string | null;
  lastUpdatedAt?: string;
}

type CheckoutAction =
  | { type: "setMethods"; payload: PaymentMethodSummary[] }
  | { type: "selectMethod"; payload: string | null }
  | { type: "setBilling"; payload: BillingAddress | null }
  | { type: "setSummary"; payload: PaymentSummary | null }
  | { type: "setCoupon"; payload: string | null };

const CheckoutStateContext = createContext<CheckoutState | undefined>(undefined);
const CheckoutDispatchContext = createContext<Dispatch<CheckoutAction> | undefined>(
  undefined
);

function reducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "setMethods":
      return {
        ...state,
        availableMethods: action.payload,
        selectedMethodId:
          state.selectedMethodId && action.payload.some((m) => m.id === state.selectedMethodId)
            ? state.selectedMethodId
            : action.payload[0]?.id ?? null,
      };
    case "selectMethod":
      return { ...state, selectedMethodId: action.payload };
    case "setBilling":
      return { ...state, billingAddress: action.payload };
    case "setSummary":
      return { ...state, summary: action.payload, lastUpdatedAt: new Date().toISOString() };
    case "setCoupon":
      return { ...state, couponCode: action.payload };
    default:
      return state;
  }
}

const initialState: CheckoutState = {
  selectedMethodId: null,
  availableMethods: [],
  billingAddress: null,
  summary: null,
  couponCode: null,
};

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutStateProvider({ children }: CheckoutProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchMemo = useMemo(() => dispatch, [dispatch]);

  return (
    <CheckoutDispatchContext.Provider value={dispatchMemo}>
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
}

export function useCheckoutState(): CheckoutState {
  const context = useContext(CheckoutStateContext);
  if (!context) {
    throw new Error(
      "Checkout state not found. Wrap component tree with <CheckoutStateProvider>."
    );
  }
  return context;
}

export function useCheckoutDispatch(): Dispatch<CheckoutAction> {
  const dispatch = useContext(CheckoutDispatchContext);
  if (!dispatch) {
    throw new Error(
      "Checkout dispatch not found. Wrap component tree with <CheckoutStateProvider>."
    );
  }
  return dispatch;
}

export function useSelectedPaymentMethod(): PaymentMethodSummary | null {
  const state = useCheckoutState();
  return (
    state.availableMethods.find((m) => m.id === state.selectedMethodId) ?? null
  );
}

// Reducer-based state derived from React/36-managing-state.md guidance.
