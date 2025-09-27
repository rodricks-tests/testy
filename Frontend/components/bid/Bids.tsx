"use client";
import { BASE_URL } from "@/config";
import { fetchWithAuth } from "@/lib/api";
import { BidDetail } from "@/lib/types";
import { useEffect, useState } from "react";

function Bids() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [myBids, setMyBids] = useState<BidDetail[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    const fetchInitialBids = async () => {
      try {
        const res = await fetchWithAuth(
          `${BASE_URL}/api/Bid/myBids?page=${currentPage}&pageSize=${pageSize}`
        );
        if (res.ok) {
          const data = await res.json();
          setMyBids(data.items);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching initial bids:", error);
      }
    };

    fetchInitialBids();
  }, []);
  const loadMoreBids = async () => {
    if (currentPage >= totalPages) return;

    setIsLoadingMore(true);
    try {
      const res = await fetchWithAuth(
        `${BASE_URL}/api/Bid/myBids?page=${
          currentPage + 1
        }&pageSize=${pageSize}`
      );

      if (res.ok) {
        const data = await res.json();
        setMyBids((prev) => [...prev, ...data.bids]);
        setCurrentPage((prev) => prev + 1);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to load more bids");
      }
    } catch (error) {
      console.error("Error loading more bids:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  return (
    <div>
      <div className="w-full space-y-2 flex flex-col">
        {myBids.map((bid) => {
          return (
            <div className="flex flex-col bg-black text-white p-2">
              <p>{bid.amount}</p>
              <p>{bid.bidderName}</p>
              <p>{bid.timestamp}</p>
              <p>{bid.title}</p>
            </div>
          );
        })}
      </div>
      {currentPage < totalPages && (
        <button onClick={loadMoreBids} disabled={isLoadingMore}>
          {isLoadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Bids;
