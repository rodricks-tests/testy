"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallback from "./ImageWithFallback";
import { FiBell, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { LuLogOut } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/config";
import { categories } from "@/lib/types";
import { useRouter } from "next/navigation";

type NavbarProps = {
  router?: ReturnType<typeof useRouter>;
};

function Navbar({ router }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandAuctions, setExpandAuctions] = useState(false);
  const [expandCategories, setExpandCategories] = useState(false);
  const [dropdownAuctionsOpen, setDropdownAuctionsOpen] = useState(false);
  const [dropdownCategoriesOpen, setDropdownCategoriesOpen] = useState(false);
  const { user, logout } = useAuth();

  const scrollOrNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      router?.push("/");
    }
  };

  const handleLogout = () => {
    if (!user) return;
    if (confirm("Do you want to logout")) {
      logout();
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-background/90 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 h-16">
          {/* Left: Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 pl-0 text-black hover:bg-gray-200 rounded-full transition transform hover:scale-105"
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* Center: Logo + Nav Links */}
          <div className="flex-1 flex items-center justify-start space-x-8 text-gray-800 font-medium text-base">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-start">
              <Image src="/Logomain.svg" alt="Logo" width={50} height={50} />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-x-8 relative">
              {/* Auctions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownAuctionsOpen(!dropdownAuctionsOpen);
                    setDropdownCategoriesOpen(false);
                  }}
                  className="hover:text-yellow-600 flex items-center gap-1"
                >
                  Auctions <FiChevronDown className="text-sm mt-0.5" />
                </button>
                {dropdownAuctionsOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                    <div className="flex flex-col">
                      <button
                        className="text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setDropdownAuctionsOpen(false);
                          scrollOrNavigate("ongoing-auctions");
                        }}
                      >
                        Ongoing Auctions
                      </button>
                      <button
                        className="text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setDropdownAuctionsOpen(false);
                          scrollOrNavigate("scheduled-auctions");
                        }}
                      >
                        Upcoming Auctions
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownCategoriesOpen(!dropdownCategoriesOpen);
                    setDropdownAuctionsOpen(false);
                  }}
                  className="hover:text-yellow-600 flex items-center gap-1"
                >
                  Categories <FiChevronDown className="text-sm mt-0.5" />
                </button>
                {dropdownCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                    <div className="flex flex-col">
                      <Link
                        href={`/`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownCategoriesOpen(false)}
                      >
                        All
                      </Link>
                      {categories.map((cat) => {
                        return (
                          <Link
                            href={`/categories/${cat}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDropdownCategoriesOpen(false)}
                          >
                            {cat}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/buy-sell" className="hover:text-yellow-600">
                Buy and Sell
              </Link>
              <Link href="/about" className="hover:text-yellow-600">
                About Us
              </Link>
              {/* ✅ Shop link added */}
              {user?.role == "Seller" && (
                <Link href="/myShop" className="hover:text-yellow-600">
                  My Shop
                </Link>
              )}
            </div>
          </div>

          {/* Right: Bell + Login */}
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full cursor-pointer hover:bg-gray-200 transition transform hover:scale-105">
              <FiBell className="text-black text-base" />
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex flex-row bg-gray-800/10 p-1 rounded-full`}
                >
                  <ImageWithFallback
                    src={BASE_URL + user.imageUrl}
                    width={30}
                    height={30}
                    alt="profile"
                    className={`rounded-full ring-1 h-8 w-8 ring-black`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Bids</DropdownMenuItem>
                  <DropdownMenuItem>Payments</DropdownMenuItem>
                  <DropdownMenuItem className="ring ">
                    <button onClick={handleLogout} className="cursor-pointer">
                      Logout
                    </button>{" "}
                    <LuLogOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button
                  type="button"
                  className="py-1.5 px-4 rounded-md text-black font-semibold shadow-md 
                bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
                hover:from-[#ffd700] hover:via-[#a67c00] hover:to-[#ffd700] transition"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Side Navigation Drawer - Left Side */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-lg font-bold text-yellow-700">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-200 p-2 rounded-full transition transform hover:scale-105"
          >
            <FiX size={24} className="text-black" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2 px-6 py-4 text-gray-800 font-medium text-base">
          {/* Auctions Expandable */}
          <button
            onClick={() => setExpandAuctions(!expandAuctions)}
            className="flex items-center justify-between w-full hover:text-yellow-600"
          >
            Auctions{" "}
            <FiChevronDown
              className={`transform transition ${
                expandAuctions ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandAuctions && (
            <div className="ml-4 flex flex-col space-y-1">
              <Link
                href="/auctions/ongoing"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Ongoing Auctions
              </Link>
              <Link
                href="/auctions/upcoming"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Upcoming Auctions
              </Link>
            </div>
          )}

          {/* Categories Expandable */}
          <button
            onClick={() => setExpandCategories(!expandCategories)}
            className="flex items-center justify-between w-full hover:text-yellow-600"
          >
            Categories{" "}
            <FiChevronDown
              className={`transform transition ${
                expandCategories ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandCategories && (
            <div className="ml-4 flex flex-col space-y-1">
              <Link
                href={`/`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownCategoriesOpen(false)}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  href={`/categories/${cat}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}

          <Link href="/buy-sell" onClick={() => setIsOpen(false)}>
            Buy and Sell
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          {/* ✅ Shop link added */}
          {user?.role == "Seller" && (
            <Link href="/myShop" onClick={() => setIsOpen(false)}>
              My Shop
            </Link>
          )}

          {user ? (
            ""
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </nav>
        <div className="bottom-4 left-4 absolute">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex flex-row bg-gray-800/10 p-1 rounded-full`}
              >
                <ImageWithFallback
                  src={BASE_URL + user.imageUrl}
                  width={30}
                  height={30}
                  className={`rounded-full ring-1 ring-black`}
                />
                <p>{user.fullName}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Bids</DropdownMenuItem>
                <DropdownMenuItem>Payments</DropdownMenuItem>
                <DropdownMenuItem className="ring ">
                  Logout <LuLogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="py-1.5 px-4 rounded-md text-black font-semibold shadow-md 
                bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] 
                hover:from-[#ffd700] hover:via-[#a67c00] hover:to-[#ffd700] transition"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
