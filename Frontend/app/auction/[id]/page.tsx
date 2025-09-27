"use client";
import AuctionPage from "@/components/ui/ItemDescription";
import { BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { fetchWithAuth } from "@/lib/api";
import { AuctionCardProps, BidDetail } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Clock, Gavel, History } from "lucide-react";
import { debounce } from "lodash";

import {
  AuctionDetail,
  AuctionHeader,
  BiddingHistory,
  BiddingSection,
  EndedBiddingSection,
} from "@/components/auction/AuctionDetail";
import { FaU } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const { subscribe, invoke, connection } = useWebSocket();
  const [auction, setAuction] = useState<AuctionCardProps>();
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bids, setBids] = useState<BidDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const fetchAuction = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/Auction/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log("auction respond:", data);
          setAuction(data);
        }
      } catch (e) {
        console.error("error fetching auction:", e);
      }
    };
    fetchAuction();
    setIsLoading(false);
    return () => {
      handleLeaveRoom();
    };
  }, []);

  // 🔁 Sort helper
  const sortByAmountDesc = (list: BidDetail[]) =>
    [...list].sort((a, b) => b.amount - a.amount);

  // 🧠 Memoized bid update handler
  const handleBidUpdate = useCallback((data: BidDetail) => {
    setBids((prev) => sortByAmountDesc([...prev, data]));
    console.log("bid update", data);
  }, []);

  // 📡 Join room and subscribe
  const handleJoinRoom = useCallback(async () => {
    if (user && id && connection && token) {
      try {
        await invoke("JoinAuctionRoom", {
          auctionId: id,
          userId: user.id,
          token,
        });
        subscribe("ReceiveBidUpdate", handleBidUpdate);
      } catch (error) {
        console.error("Error joining auction room:", error);
      }
    }
  }, [user, id, connection, token, invoke, subscribe, handleBidUpdate]);

  // 🚪 Leave room
  const handleLeaveRoom = useCallback(async () => {
    if (user && id && connection && token) {
      try {
        await invoke("LeaveAuctionRoom", {
          auctionId: id,
          userId: user.id,
          token,
        });
      } catch (error) {
        console.error("Error leaving auction room:", error);
      }
    }
  }, [user, id, connection, token, invoke]);

  // 📥 Fetch initial bids
  const fetchBids = useCallback(async (): Promise<BidDetail[]> => {
    const response = await fetchWithAuth(`${BASE_URL}/api/Bid/Auction/${id}`);
    if (response.ok) {
      const allBids: BidDetail[] = await response.json();
      return sortByAmountDesc(allBids);
    }
    return [];
  }, [id]);

  // 🚀 Initial load
  useEffect(() => {
    const init = async () => {
      await handleJoinRoom();
      setTimeout(async () => {
        const sortedBids = await fetchBids();
        setBids(sortedBids);
      }, 1000);
    };
    init();

    return () => {
      handleLeaveRoom();
    };
  }, [handleJoinRoom, fetchBids, handleLeaveRoom]);

  // 🧾 Place bid
  const handlePlaceBid = async () => {
    const body = {
      auctionId: id,
      amount: bidAmount,
    };
    const response = await fetchWithAuth(`${BASE_URL}/api/Bid`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Bid Placed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {auction && <AuctionHeader auction={auction} router={router} />}
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Product Image + Description */}

        {auction && (
          <AuctionDetail
            auction={auction}
            currentBidValue={bids[0]?.amount}
            router={router}
          />
        )}

        {/*Bidding Section */}

        {auction?.winnerId == null ? (
          <BiddingSection
            bids={bids}
            setBidAmount={setBidAmount}
            bidAmount={bidAmount}
            handlePlaceBid={handlePlaceBid}
            minBid={auction?.minimumBid}
            user={user}
            auction={auction}
            router={router}
          />
        ) : (
          <EndedBiddingSection
            bids={bids}
            setBidAmount={setBidAmount}
            bidAmount={bidAmount}
            handlePlaceBid={handlePlaceBid}
            minBid={auction?.minimumBid}
            user={user}
            auction={auction}
            router={router}
          />
        )}
      </div>
    </div>
  );
};
export default Page;
