import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PaymentStatusBanner } from "@/features/payments/components/PaymentStatusBanner";

describe("PaymentStatusBanner", () => {
  it("renders the correct label for completed status", () => {
    render(<PaymentStatusBanner status="completed" updatedAt="2024-01-01T00:00:00Z" />);
    expect(screen.getByText(/Payment completed/)).toBeInTheDocument();
  });
});
