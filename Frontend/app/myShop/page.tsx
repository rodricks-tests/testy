"use client";

import Sidebar from "@/components/ui/Sidebar";
import { useSellerData } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#FFD700", // Gold
  "#C0C0C0", // Silver
  "#F5F5DC", // Beige/Cream
  "#DAA520", // Dark Gold
  "#B8860B", // Dark Goldenrod
  "#D3D3D3", // Light Gray
  "#FFF8DC", // Cornsilk
  "#F0E68C", // Khaki
  "#E6E6FA", // Lavender
  "#FFFACD", // Lemon Chiffon
  "#A9A9A9"  // Dark Gray
];

export default function AnalyticsPage() {
  const { auctions, products, isLoading, refreshAll } = useSellerData();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const totalRevenue = auctions
    .filter(
      (auctions) => auctions.status === "Ended" && auctions.winBid?.amount
    )
    .reduce(
      (acc, auctions) => acc + (auctions.winBid ? auctions.winBid.amount : 0),
      0
    );

  const recentAuctions = auctions
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )
    .slice(0, 4);

  const topAuctions = auctions
    .sort(
      (a, b) =>
        (b.winBid ? b.winBid.amount : 0) - (a.winBid ? a.winBid.amount : 0)
    )
    .slice(0, 4)
    .map((auction) => ({
      id: auction.id,
      name: auction.productTitle,
      bids: auction.bids.length,
      revenue: auction.winBid ? `$${auction.winBid.amount}` : "N/A",
    }));

  const revenueByMonth = auctions.reduce((acc, auction) => {
    if (auction.status !== "Ended" || !auction.winBid?.amount) return acc;

    const date = new Date(auction.startTime);
    const key = `${date.getFullYear()}-${date.getMonth()}`; // e.g. "2025-08"

    acc.set(key, (acc.get(key) || 0) + auction.winBid.amount);
    return acc;
  }, new Map<string, number>());

  // last 12 months data
  const revenueData = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - (11 - i));

    const key = `${monthDate.getFullYear()}-${monthDate.getMonth()}`;
    const monthStr = monthDate.toLocaleString("default", { month: "short" });

    return {
      month: monthStr,
      revenue: revenueByMonth.get(key) || 0,
    };
  });

  const uniqueBiddersCount = auctions.reduce((acc, auction) => {
    auction.bids.forEach((bid) => acc.add(bid.bidderId));
    return acc;
  }, new Set()).size;

  const categoryData = Object.entries(
    auctions.reduce((acc, auction) => {
      acc[auction.category] = (acc[auction.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="hidden md:fixed md:block left-0 top-0 h-full z-10 shadow-2xl">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 w-full">
        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 min-h-full">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              Dashboard
            </h1>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            <div className="relative p-4 md:p-6 bg-white shadow-lg md:shadow-xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <h2 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">Total Auctions</h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-1 md:mt-2">{auctions.length}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
            </div>
            
            <div className="relative p-4 md:p-6 bg-white shadow-lg md:shadow-xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <h2 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">Active Auctions</h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-1 md:mt-2">
                {auctions.filter((a) => a.status === "Active").length}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500"></div>
            </div>
            
            <div className="relative p-4 md:p-6 bg-white shadow-lg md:shadow-xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <h2 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">Revenue</h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent mt-1 md:mt-2">
                ${isMobile ? (totalRevenue > 999 ? `${(totalRevenue/1000).toFixed(1)}k` : totalRevenue.toLocaleString()) : totalRevenue.toLocaleString()}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </div>
            
            <div className="relative p-4 md:p-6 bg-white shadow-lg md:shadow-xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <h2 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">Unique Bidders</h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-1 md:mt-2">{uniqueBiddersCount}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400"></div>
            </div>
          </div>

          {/* Tables Section*/}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {/* Recent Auctions Table */}
            <div className="bg-white shadow-lg md:shadow-2xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Recent Auctions</h2>
              </div>
              <div className="overflow-auto max-h-80 md:max-h-96">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Auction</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Bids</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAuctions.map((auction, index) => (
                      <tr key={auction.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                          <div className="truncate max-w-[120px] md:max-w-none" title={auction.productTitle}>
                            {auction.productTitle}
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-center">
                          <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {auction.bids.length}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-yellow-600 text-right">
                          {auction.winBid ? 
                            (isMobile && auction.winBid.amount > 999 ? 
                              `$${(auction.winBid.amount/1000).toFixed(1)}k` : 
                              `$${auction.winBid.amount.toLocaleString()}`
                            ) : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Auctions Table */}
            <div className="bg-white shadow-lg md:shadow-2xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Top Auctions</h2>
              </div>
              <div className="overflow-auto max-h-80 md:max-h-96">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Auction</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Bids</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topAuctions.map((auction, index) => (
                      <tr key={auction.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900">
                          <div className="truncate max-w-[120px] md:max-w-none" title={auction.name}>
                            {auction.name}
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-center">
                          <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {auction.bids}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold text-yellow-600 text-right">
                          {auction.revenue !== "N/A" && isMobile ? 
                            (parseFloat(auction.revenue.replace('$', '').replace(',', '')) > 999 ? 
                              `$${(parseFloat(auction.revenue.replace('$', '').replace(',', ''))/1000).toFixed(1)}k` : 
                              auction.revenue
                            ) : auction.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Charts*/}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {/* Revenue Trend */}
            <div className="bg-white shadow-lg md:shadow-2xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Revenue Trend</h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Monthly performance over the last 12 months</p>
              </div>
              <div className="p-3 md:p-6">
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                  <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      interval={isMobile ? 1 : 0}
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 10 : 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#d1d5db' }}
                      width={isMobile ? 40 : 60}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: isMobile ? '12px' : '14px'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="url(#goldGradient)"
                      strokeWidth={isMobile ? 2 : 3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: isMobile ? 4 : 6 }}
                      activeDot={{ r: isMobile ? 6 : 8, fill: '#f59e0b' }}
                    />
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categories*/}
            <div className="bg-white shadow-lg md:shadow-2xl rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Category Breakdown</h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Distribution of auctions by category</p>
              </div>
              <div className="p-3 md:p-6">
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={isMobile ? 80 : 120}
                      label={isMobile ? 
                        false : 
                        ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: isMobile ? '12px' : '14px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Mobile Legend */}
                {isMobile && categoryData.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {categoryData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-xs text-gray-600 truncate">
                          {entry.name} ({entry.value})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-4 md:h-8"></div>
        </div>
      </div>
    </div>
  );
}