"use client";

import { SellerDataProvider } from "@/contexts/ShopContext";

export default function BaseScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main> <SellerDataProvider>{children}</SellerDataProvider></main>;
}
