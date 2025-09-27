"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import { 
  Menu, 
  Clock, 
  Eye,
  Plus,
  TrendingUp,
  DollarSign,
  Gavel
} from 'lucide-react';
import { IoMdAdd } from "react-icons/io";
import { useSellerData } from "@/contexts/ShopContext";
import { BASE_URL } from "@/config";
import { Auction } from "@/lib/types";

const AuctionCard = ({ auction, getTimeRemaining, onViewAuction }) => {
  const timeRemaining = getTimeRemaining(auction.endTime);
  const isExpired = timeRemaining === "Expired";
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-48 h-48 lg:h-auto">
          <img
            src={BASE_URL + auction.imageUrl}
            alt={auction.productTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between h-full">
            {/* Left Content */}
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-bold text-gray-800 leading-tight">
                {auction.productTitle}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Minimum Bid</p>
                  <p className="text-lg font-semibold text-gray-800">
                    Rs. {auction.minimumBid.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Current Range</p>
                  <p className="text-lg font-semibold text-blue-600">
                    Rs. {auction.minimumBid.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className={isExpired ? 'text-red-600 font-semibold' : ''}>
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-end lg:items-end space-y-0 lg:space-y-3 space-x-3 lg:space-x-0 mt-4 lg:mt-0">
              <button 
                onClick={() => onViewAuction(auction.id)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>View Auction</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyAuctions = () => {
  const router = useRouter();
  const { auctions, products, isLoading, refreshAll } = useSellerData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!(auctions.length > 0)) {
      refreshAll();
    }
    console.log("auctions", auctions);
    setLoading(false);
  }, []);

  // Format remaining time
  const getTimeRemaining = (endTime: string) => {
    const total = Date.parse(endTime) - Date.now();
    if (total <= 0) return "Expired";
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  const handleViewAuction = (auctionId: string) => {
    router.push(`/auction/${auctionId}`);
  };

  const handleCreateAuction = () => {
    router.push("/myShop/myProducts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-10 shadow-2xl">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="ml-64 transition-all duration-300">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Auctions</h1>
                <p className="text-gray-600 text-sm mt-1">Manage and monitor your auction listings</p>
              </div>
            </div>
            
            <button 
              onClick={handleCreateAuction}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Auction</span>
            </button>
          </div>
        </div>

        {/* Auctions List */}
        <div className="p-4 lg:p-6">
          {loading || isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading auctions...</span>
            </div>
          ) : auctions.length === 0 ? (
            <div className="text-center py-12">
              <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No auctions yet</h3>
              <p className="text-gray-600 mb-6">You haven't added any products to auctions yet.</p>
              <button 
                onClick={handleCreateAuction}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Create Auction</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {auctions.map((auction) => (
                <AuctionCard 
                  key={auction.id} 
                  auction={auction} 
                  getTimeRemaining={getTimeRemaining}
                  onViewAuction={handleViewAuction}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={handleCreateAuction}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 animate-bounce"
      >
        <IoMdAdd className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MyAuctions;