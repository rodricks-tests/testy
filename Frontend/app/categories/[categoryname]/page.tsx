"use client";

import { useEffect, useState } from "react";
import AuctionCard from "@/components/auction/AuctionCard";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import Search from "@/components/ui/Search";
import toast from "react-hot-toast";
import { AuctionCardProps, PagedResponse } from "@/lib/types";
import { BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWithAuth } from "@/lib/api";
import { useParams } from "next/navigation";
import { set } from "lodash";

export default function Home() {
  const { categoryname } = useParams();
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<AuctionCardProps[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [sQuery, setSQuery] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);


  useEffect(()=>{
    setIsLoadingFeed(true)
    fetchSearch()
    setIsLoadingFeed(false)
  },[])

  // 🔍 Search handler
  const fetchSearch = async () => {
    var params = new URLSearchParams({
      title: sQuery,
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      category: categoryname?.toString() || "", 
    });

    try {
      const fetchPromise = user
        ? fetchWithAuth(`${BASE_URL}/api/search?${params.toString()}`)
        : fetch(`${BASE_URL}/api/search/guess?${params.toString()}`);

      const res = await toast.promise(fetchPromise, {
        loading: "Searching...",
        success: <b></b>,
        error: <b>Failed to search.</b>,
      });

      if (!res.ok) throw new Error("Search failed");

      const data: PagedResponse<AuctionCardProps> = await res.json();
      if (!(data.items.length > 0)) {
        toast("😔 No results found for your search.");
      }
      setAuctions(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("❌ Search error:", error);
      toast.error("Sorry. Failed to search");
    }
  };

  // 🧠 Filtered auction groups
  const ongoingAuctions = auctions.filter(
    (auction) =>
      auction.startTime < new Date().toISOString() &&
      auction.endTime > new Date().toISOString() &&
      auction.status !== "Cancelled"
  );

  const scheduledAuctions = auctions.filter(
    (auction) => auction.startTime > new Date().toISOString()
  );

  return (
    <div className="bg-cover bg-center text-foreground pt-16 flex items-center flex-col w-full h-full gap-4 scrollbar-hidden">
      <Navbar />
      <Hero />
      <Search query={sQuery} setQuery={setSQuery} onClick={fetchSearch} />

      <div className="flex flex-col items-center justify-center gap-4 w-full px-6 md:px-12">
        {/* Ongoing Auctions */}
        <h2 className="text-2xl w-full bg-black/80 text-white py-2 px-4 rounded-2xl">Ongoing Auctions</h2>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {isLoadingFeed ? (
            <div className="text-center py-8">Loading auctions...</div>
          ) : ongoingAuctions.length > 0 ? (
            ongoingAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <div className="text-center py-8">No ongoing auctions found.</div>
          )}
        </div>

        {/* Scheduled Auctions */}
        <h2 className="text-2xl w-full  bg-black/80 text-white py-2 px-4 rounded-2xl">Scheduled Auctions</h2>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {scheduledAuctions.length > 0 ? (
            scheduledAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <div className="text-center py-8">No scheduled auctions found.</div>
          )}
        </div>

        {/* Pagination (for search) */}
        {sQuery && totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-muted rounded"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-muted rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
