"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { fetchWithAuth } from "@/lib/api";
import { BASE_URL } from "@/config";
import type { Auction, SellerProduct } from "@/lib/types";

interface SellerDataContextType {
  auctions: Auction[];
  products: SellerProduct[];
  isLoading: boolean;
  error: string | null;
  fetchAuctions: () => Promise<void>;
  fetchSellerProducts: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

const SellerDataContextType = createContext<SellerDataContextType | undefined>(
  undefined
);

export const SellerDataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuctions = useCallback(async () => {
    // if (!user || user.role !== 'Seller') return;
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(BASE_URL + "/api/Shop/auctions");
      if (response.ok) {
        const data: Auction[] = await response.json();
        console.log("Fetched auctions:", data);
        setAuctions(data);
      } else {
        setError("Failed to fetch auctions");
      }
    } catch (error) {
      setError("Error fetching auctions");
      console.error("Error fetching auctions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchSellerProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(BASE_URL + "/api/Shop/Products");
      if (response.ok) {
        const data: SellerProduct[] = await response.json();
        setProducts(data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchAuctions(), fetchSellerProducts()]);
  }, [fetchAuctions, fetchSellerProducts]);

  // const clearSellerData = useCallback(() => {
  //     setAuctions([]);
  //     setProducts([]);
  //     setError(null);
  // }, []);

  return (
    <SellerDataContextType.Provider
      value={{
        auctions,
        products,
        isLoading,
        error,
        fetchAuctions,
        fetchSellerProducts,
        refreshAll,
      }}
    >
      {children}
    </SellerDataContextType.Provider>
  );
};

export const useSellerData = () => {
  const context = useContext(SellerDataContextType);
  if (!context) {
    throw new Error("useSellerData must be used within a SellerDataProvider");
  }
  return context;
};
