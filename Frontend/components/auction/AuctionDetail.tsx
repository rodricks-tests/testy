"use client";
import { BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useCountdown } from "@/hooks/useCountdown";
import { AuctionCardProps, BidDetail, User } from "@/lib/types";
import { Clock, Gavel, History } from "lucide-react";
import { useEffect, useState } from "react";
import timeAgo from "../helper/timeAgo";
import { IoArrowBack } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { MdOutlineZoomOutMap } from "react-icons/md";
import remarkGfm from "remark-gfm";
import { NextRouter, useRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type AuctionDetailProps = {
  auction: AuctionCardProps;
  currentBidValue?: number;
  router: AppRouterInstance;
};

export function AuctionDetail({
  auction,
  currentBidValue,
}: AuctionDetailProps) {
  const { productTitle, category, imageUrl, description } = auction;
  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-700 border-gray-700 border-8 rounded-md relative">
        <Zoom>
          <img
            src={BASE_URL + imageUrl}
            alt="Auction Item"
            className="w-full h-[450px] object-cover"
          />
        </Zoom>
        <span className="absolute top-4 left-4 bg-yellow-700 text-xs px-3 py-1 rounded-full">
          {category}
        </span>
        <span className="absolute top-4 right-4 bg-white text-black text-xl p-2 rounded-full pointer-events-none">
          <MdOutlineZoomOutMap />
        </span>
      </div>

      {/* Product Description */}
      <div className="bg-gray-700 rounded-lg p-6 pb-4 pt-4 mt-4">
        <div className="bg-gray-800 p-3 rounded-lg">
          <p className="text-medium text-gray-400">Current Bid</p>
          <p className="text-2xl font-bold text-yellow-500">
            Rs. {currentBidValue?.toFixed(2) || auction.minimumBid?.toFixed(2)}
          </p>

          <h2 className="text-lg font-semibold mt-4">{productTitle}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export function AuctionHeader({ auction, router }: AuctionDetailProps) {
  const { startTime, endTime, status } = auction;
  const targetTime = status === "Scheduled" ? startTime : endTime;
  const { timeLeft, isExpired, localTargetTime } = useCountdown(targetTime);

  return (
    <div className="gap-2 flex-col md:flex-row bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 rounded-md flex justify-between items-center border-b-2 py-2 pl-8 pr-8 border-b-blue-600 mb-6">
      <div className=" flex-row hidden md:flex">
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center space-x-2 cursor-pointer"
        >
          <IoArrowBack /> <span>Back</span>
        </button>
      </div>
      <div className="flex flex-row">
        <p className="text-medium text-gray-400 w-full">Live Auction Room</p>
      </div>
      <div className="flex items-center font-semibold gap-2  ">
        <Clock size={20} />
        <span className="text-lg sm:block hidden ">Time Remaining</span>
        <span className="bg-yellow-600 text-black px-3 py-1 rounded-full font-bold">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
type BidHistoryProps = {
  bids: BidDetail[];
  userId?: string;
  isEnded? : boolean;
};

export function BiddingHistory({ bids, userId, isEnded }: BidHistoryProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <History size={18} className="text-yellow-500" />
        <h3 className="text-lg font-semibold">Bid History</h3>
      </div>
      <p className="text-sm text-gray-400 mb-3">
        {bids?.length == 0 ? "No" : bids?.length} bids placed
      </p>

      <div className="space-y-3 max-h-60 overflow-y-scroll scrollbar-hidden snap-start p-1">
        {bids &&
          bids.map((bid, index) => {
            const isCurrentUser = userId == bid.bidderId;
            return (
              <div
                className={`flex justify-between bg-gray-800 p-3 rounded-lg ${
                  isCurrentUser && "ring-1 ring-yellow-500"
                }`}
              >
                <div>
                  <p className="font-semibold">Rs. {bid?.amount?.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">
                    <span className={`${isCurrentUser && "text-yellow-500"}`}>
                      {bid.bidderName}
                    </span>{" "}
                    • {timeAgo(new Date(bid?.timestamp))}
                  </p>
                </div>
                {index == 0 && (
                  <span className="bg-yellow-600 h-6 text-black text-xs px-2 py-1 rounded-md">
                    Highest
                  </span>
                )}
              </div>
            );
          })}
        {bids.length == 0 && (
          <div className="flex justify-between bg-gray-800 p-3 rounded-lg">
            <div>
              
              <p className="font-semibold">{isEnded ? "No Bids found" : "Place First Bid" }</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
type BidSectionProps = {
  bids: BidDetail[];
  auction?: AuctionCardProps;
  setBidAmount: (amount: number) => void;
  bidAmount: number;
  handlePlaceBid: () => void;
  minBid?: number;
  user?: User | null;
  router: AppRouterInstance;
};
export function BiddingSection({
  bids,
  bidAmount,
  auction,
  minBid = 0,
  setBidAmount,
  handlePlaceBid,
  user,
  router,
}: BidSectionProps) {
  const [range, setRange] = useState<number>(10);
  const [maxBid, setMaxBid] = useState<BidDetail>(bids[0]);
  const [maxBidAmount, setMaxBidAmount] = useState<number>(minBid);

  useEffect(() => {
    setBidAmount(bids[0]?.amount + range * 1);
    setMaxBid(bids[0]);
    if (bids[0]?.amount) {
      setMaxBidAmount(bids[0]?.amount);
    } else if (minBid) {
      setMaxBidAmount(minBid);
    }
  }, [bids, minBid]);

  if (!user)
    return (
      <div className="space-y-6">
        {/* Place Your Bid */}
        <div className="bg-gray-700 rounded-lg p-6 shadow-md">
          <div className="flex md:flex-col flex-col gap-2 mb-4">
            <div className="flex flex-row gap-2">
              <Gavel size={18} className="text-yellow-500" />
              <h3 className="text-lg font-semibold">Place Your Bid</h3>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Current highest bid:{" "}
            <span className="text-yellow-500 font-semibold">
              Rs. {maxBidAmount?.toFixed(2)}
            </span>
          </p>

          {/* Quick Bids */}
          <div className="flex gap-3 mb-4">
            <button
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setBidAmount(maxBidAmount + range * 1)}
            >
              Rs. {(maxBidAmount + range * 1).toFixed(2)}
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setBidAmount(maxBidAmount + range * 2)}
            >
              Rs. {(maxBidAmount + range * 2).toFixed(2)}
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setBidAmount(maxBidAmount + range * 3)}
            >
              Rs. {(maxBidAmount + range * 3).toFixed(2)}
            </button>
          </div>
          {/* Custom Bid */}
          <label htmlFor="" className="text-sm text-gray-400 mb-4">
            Minimum:
            <span className="text-gray-300">
              {" "}
              {`Rs. ${minBid?.toFixed(2)}`}
            </span>
          </label>
          <input
            type="number"
            placeholder={`Minimum: Rs. ${minBid ? minBid : "0"}`}
            value={bidAmount?.toFixed(2)}
            disabled={true}
            min={minBid}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            onClick={() => router.push("/login")}
            className="w-full mt-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
          >
            Register to Bid
          </button>
        </div>

        {/* Bid History */}
        <BiddingHistory bids={bids} isEnded={false}/>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Place Your Bid */}
      <div className="bg-gray-700 rounded-lg p-6 shadow-md">
        <div className="flex md:flex-col flex-col gap-2 mb-4">
          <div className="flex flex-row gap-2">
            <Gavel size={18} className="text-yellow-500" />
            <h3 className="text-lg font-semibold">Place Your Bid</h3>
          </div>

          <h1 className="text-yellow-500">
            {maxBid?.bidderId == user?.id && "Current highest BID is yours"}
          </h1>
          {auction?.winnerId == user.id && (
            <button
              onClick={() =>
                router.push(`/checkout?auctionId=${auction?.id}`)
              }
              disabled={user?.id == auction?.sellerId}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
            >
              Pay Now
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Current highest bid:{" "}
          <span className="text-yellow-500 font-semibold">
            Rs. {maxBidAmount?.toFixed(2)}
          </span>
        </p>
        {}
        {/* Quick Bids */}
        <div className="flex gap-3 mb-4">
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setBidAmount(maxBidAmount + range * 1)}
          >
            Rs. {(maxBidAmount + range * 1).toFixed(2)}
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setBidAmount(maxBidAmount + range * 2)}
          >
            Rs. {(maxBidAmount + range * 2).toFixed(2)}
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setBidAmount(maxBidAmount + range * 3)}
          >
            Rs. {(maxBidAmount + range * 3).toFixed(2)}
          </button>
        </div>

        {/* Custom Bid */}
        <label htmlFor="" className="text-sm text-gray-400 mb-4">
          Minimum:
          <span className="text-gray-300"> {`Rs. ${minBid?.toFixed(2)}`}</span>
        </label>
        <input
          type="number"
          placeholder={`Minimum: Rs. ${minBid ? minBid : "0"}`}
          value={bidAmount?.toFixed(2)}
          disabled={user?.id == auction?.sellerId}
          min={minBid}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          onClick={handlePlaceBid}
          disabled={user?.id == auction?.sellerId}
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
        >
          Place Bid
        </button>
      </div>

      {/* Bid History */}
      <BiddingHistory bids={bids} userId={user?.id}  isEnded={false}/>
    </div>
  );
}

export function EndedBiddingSection({
  bids,
  bidAmount,
  auction,
  minBid = 0,
  setBidAmount,
  handlePlaceBid,
  user,
  router,
}: BidSectionProps) {
  const [range, setRange] = useState<number>(10);
  const [maxBid, setMaxBid] = useState<BidDetail>(bids[0]);
  const [maxBidAmount, setMaxBidAmount] = useState<number>(minBid);

  useEffect(() => {
    setBidAmount(bids[0]?.amount + range * 1);
    setMaxBid(bids[0]);
    if (bids[0]?.amount) {
      setMaxBidAmount(bids[0]?.amount);
    } else if (minBid) {
      setMaxBidAmount(minBid);
    }
  }, [bids, minBid]);

  if (!user || auction?.winnerId != user.id)
    return (
      <div className="space-y-6">
        {/* Place Your Bid */}
        <div className="bg-gray-700 rounded-lg p-6 shadow-md">
          <div className="flex md:flex-col flex-col gap-2 mb-4">
            <div className="flex flex-row gap-2">
              <Gavel size={18} className="text-yellow-500" />
              <h3 className="text-lg font-semibold">The Auction Has Ended</h3>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Current highest bid:{" "}
            <span className="text-yellow-500 font-semibold">
              Rs. {maxBidAmount?.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Bid History */}
        <BiddingHistory bids={bids}  isEnded={true}/>
      </div>
    );

  if (auction?.winnerId == user.id) {
    return (
      <div className="space-y-6">
        {/* Place Your Bid */}
        <div className="bg-gray-700 rounded-lg p-6 shadow-md">
          <div className="flex md:flex-col flex-col gap-2 mb-4">
            <div className="flex flex-row gap-2">
              <Gavel size={18} className="text-yellow-500" />
              <h3 className="text-lg font-semibold">You Won The Auction</h3>
            </div>

            <button
              onClick={() => router.push(`/checkout?auctionId=${auction?.id}`)}
              disabled={user?.id == auction?.sellerId}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
            >
              Pay Now
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-4">
             Bid Amount:{" "}
            <span className="text-yellow-500 font-semibold">
              Rs. {maxBidAmount?.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Bid History */}
        <BiddingHistory bids={bids} userId={user?.id}  isEnded={true}/>
      </div>
    );
  }
  
}
