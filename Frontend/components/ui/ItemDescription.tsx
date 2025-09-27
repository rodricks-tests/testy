import React from "react";
import { Clock, Gavel, History } from "lucide-react";
import {
  AuctionDetail,
  AuctionHeader,
  BiddingHistory,
  BiddingSection,
} from "../auction/AuctionDetail";

export default function AuctionPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* <AuctionHeader /> */}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Product Image + Description */}

        {/* <AuctionDetail /> */}

        {/*Bidding Section */}
        {/* <BiddingSection /> */}
      </div>
    </div>
  );
}
