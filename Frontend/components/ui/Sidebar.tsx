"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  BarChart,
  Bell,
  Settings,
  User,
  Gavel,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "My Products", path: "/myShop/myProducts", icon: FileText, shortName: "Products" },
  { name: "Analytics", path: "/myShop", icon: BarChart, shortName: "Analytics" },
  { name: "My Auctions", path: "/myShop/auctions", icon: Gavel, shortName: "Auctions" },
  { name: "Notifications", path: "/myShop/notifications", icon: Bell, shortName: "Alerts" },
  { name: "Settings", path: "/myShop/settings", icon: Settings, shortName: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-16"
      } bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col justify-between transition-all duration-300 ease-in-out h-screen relative shadow-2xl border-r border-yellow-500/20`}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      
      <div className="flex flex-col h-full">
        <div className={`flex items-center justify-center py-4 ${isExpanded ? 'px-4' : 'px-2'} border-b border-yellow-500/10`}>
          <Link href="/" className="flex items-center justify-center group relative">
            <div className={`relative ${isExpanded ? 'p-3' : 'p-2'} rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300 group-hover:scale-105`}>
              <Image 
                src="/Logomain.svg" 
                alt="Logo" 
                width={isExpanded ? 36 : 24} 
                height={isExpanded ? 36 : 24}
                className="filter brightness-0 invert transition-all duration-300"
              />
            </div>
          </Link>
        </div>

        <nav className={`flex-1 mt-4 ${isExpanded ? 'px-3' : 'px-2'} space-y-1`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.path}
                  className={`flex items-center ${isExpanded ? 'px-3 py-3' : 'px-2 py-3'} rounded-lg transition-all duration-200 relative overflow-hidden ${
                    isActive 
                      ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 text-yellow-300 shadow-md" 
                      : "hover:bg-gradient-to-r hover:from-gray-800/80 hover:to-gray-700/80 hover:text-white text-gray-300"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                  )}
                  
                  <div className={`${isExpanded ? 'mr-3' : 'mx-auto'} flex items-center justify-center transition-all duration-200 ${
                    isActive 
                      ? "text-yellow-300" 
                      : "text-gray-400 group-hover:text-white"
                  }`}>
                    <Icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  
                  {isExpanded && (
                    <span className={`font-medium transition-all duration-200 truncate ${
                      isActive ? "text-yellow-200" : "text-gray-300 group-hover:text-white"
                    }`}>
                      {item.name}
                    </span>
                  )}

                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-200"></div>
                </Link>

                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 transform -translate-y-1/2">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className={`${isExpanded ? 'px-3' : 'px-2'} pb-4 space-y-1 border-t border-yellow-500/10 pt-4 mt-auto`}>
          <div className="relative group">
            <Link
              href="/admin/account"
              className={`flex items-center ${isExpanded ? 'px-3 py-3' : 'px-2 py-3'} hover:bg-gradient-to-r hover:from-gray-800/80 hover:to-gray-700/80 rounded-lg transition-all duration-200 text-gray-300 hover:text-white relative overflow-hidden`}
            >
              <div className={`${isExpanded ? 'mr-3' : 'mx-auto'} flex items-center justify-center text-gray-400 group-hover:text-white transition-all duration-200`}>
                <User size={20} className="transition-transform duration-200 group-hover:scale-110" />
              </div>
              {isExpanded && (
                <span className="font-medium transition-all duration-200">
                  Account
                </span>
              )}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-200"></div>
            </Link>

            {!isExpanded && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 transform -translate-y-1/2">
                Account
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`group flex items-center ${isExpanded ? 'px-3 py-3' : 'px-2 py-3'} hover:bg-gradient-to-r hover:from-gray-800/80 hover:to-gray-700/80 rounded-lg transition-all duration-200 w-full text-gray-300 hover:text-white relative overflow-hidden`}
          >
            <div className={`${isExpanded ? 'mr-3' : 'mx-auto'} flex items-center justify-center text-gray-400 group-hover:text-yellow-400 transition-all duration-200`}>
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </div>
            {isExpanded && (
              <span className="font-medium transition-all duration-200">
                Collapse
              </span>
            )}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-200"></div>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
    </aside>
  );
}