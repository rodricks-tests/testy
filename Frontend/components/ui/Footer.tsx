import React from "react";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        
        {/* Logo (stays left) */}
        <div className="flex-shrink-0">
          <ImageWithFallback
            src="/logo-t-w.svg"
            className="w-40 sm:w-48 md:w-60"
            alt="Bidzy Logo"
            width={720}
            height={240}
            fallback={
              <div className="w-20 h-20 bg-gray-200/10 rounded-lg flex items-center justify-center animate-pulse">
                <span className="text-gray-500">Image not available</span>
              </div>
            }
          />
        </div>

        {/* Quick Links (centered) */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/auctions/ongoing" className="hover:text-yellow-400">Ongoing Auctions</Link></li>
            <li><Link href="/auctions/upcoming" className="hover:text-yellow-400">Upcoming Auctions</Link></li>
            <li><Link href="/seller" className="hover:text-yellow-400">Becoming a Seller</Link></li>
            <li><Link href="/register" className="hover:text-yellow-400">Register</Link></li>
            <li><Link href="/login" className="hover:text-yellow-400">Login</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Bidzy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
