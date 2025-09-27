"use client";
import { AuctionCategory, categories } from "@/lib/types";
import { Search as SearchIcon } from "lucide-react";

type SearchProps = {
  query: string | undefined;
  setQuery: (query: string) => void;
  onClick: () => void;
  setCategory?: (category: AuctionCategory) => void;
};

function Search({ query, setQuery, onClick, setCategory }: SearchProps) {
  return (
    <div className="w-full p-2">
    <div className="flex flex-col md:flex-row gap-4 p-2 rounded-2xl border-2 border-gold-middle bg-background shadow-md w-full max-w-3xl m-auto">
      
      {setCategory && (
        <div className="w-full md:w-1/3">
          
          <select
            id="category"
            defaultValue=""
            onChange={(e) => setCategory(e.target.value as AuctionCategory)}
            className="w-full rounded-lg px-3 py-2 bg-white/40 backdrop-blur-md text-gray-900 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold-middle focus:border-gold-middle appearance-none"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="text-gray-900 bg-white hover:bg-yellow-100" // ⚠️ Limited effect
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          value={query}
          placeholder="Search auctions..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onClick();
          }}
          className="w-full rounded-lg px-4 py-2 bg-white/40 backdrop-blur-md text-gray-900 placeholder-gray-600 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold-middle focus:border-gold-middle"
        />
        <button
          onClick={onClick}
          className="p-2 rounded-full bg-gold-middle hover:bg-yellow-700 transition-colors text-white"
          aria-label="Search"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
    </div></div>
  );
}

export default Search;