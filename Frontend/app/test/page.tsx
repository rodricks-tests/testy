"use client";
import AuctionCard from "@/components/auction/AuctionCard";
import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { AuctionCardProps, BidDetail, Product } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api";
import { BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/contexts/WebSocketContext";
import Hero from "@/components/ui/Hero";

import { useNotifications } from "@/contexts/NotificationContext";
import ProductForm from "@/components/auction/ProductForm";
import AuctionForm from "@/components/auction/AuctionForm";
import BidRegistrationForm from "@/components/auction/BidRegisterForm";
import ColorPalette from "@/components/ui/ColorPallet";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import Bids from "@/components/bid/Bids";
import MyProducts from "@/components/ui/MyProducts";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import Search from "@/components/ui/Search";



export default function Home() {
  const { notifications } = useNotifications();
  const [auctions, setAuctions] = useState<AuctionCardProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const { user } = useAuth();
  const { connection, subscribe, unsubscribe, invoke } = useWebSocket();
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [myBids, setMyBids] = useState<BidDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // You can make this dynamic too if needed
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!connection) {
      return;
    }

    invoke("JoinAuctionGroup", {
      groupIds: ["338a2831-71b9-487c-b072-4a9a3da7d06c"],
      userId: "",
    });

    return;
  }, [connection]);

  useEffect(() => {
    const fetchFeedData = async () => {
      setIsLoadingFeed(true);
      try {
        const [auctionRes, productRes, bidRes] = await Promise.all([
          //we can add more request
          user
            ? fetchWithAuth(BASE_URL + "/api/auction")
            : fetch(BASE_URL + "/api/auction"),
          fetchWithAuth(BASE_URL + "/api/product"),
          fetchWithAuth(
            `${BASE_URL}/api/Bid/myBids?page=${currentPage}&pageSize=${pageSize}`
          ),
        ]);

        if (auctionRes.ok) {
          const auctionData = await auctionRes.json();
          console.log("auction data", auctionData);
          console.log("auction data", auctionData);
          setAuctions(auctionData);
        } else {
          // toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch posts.' });
        }
        if (productRes.ok) {
          const productData = await productRes.json();
          setProducts(productData);
        } else {
          // toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch posts.' });
        }
        if (bidRes.ok) {
          const bidData = await bidRes.json();
          console.log("mybids:", bidData);
          setMyBids(bidData.items);
          setTotalPages(bidData.totalPages);
        } else {
          // toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch posts.' });
        }
      } catch (error) {
        console.error(error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        if (errorMessage !== "Unauthorized") {
          // toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch feed data.' });
          console.log(error);
        }
      } finally {
        setIsLoadingFeed(false);
      }
    };
    fetchFeedData();
  }, [currentPage]);

  return (
    <div className=" bg-cover bg-center text-foreground py-16 flex items-center flex-col w-full h-full gap-4 scrollbar-hidden">
      <Navbar />
      <Hero />
      <MarkdownEditor/>

      <ProductForm />
      <Bids />
      <MyProducts/>

      {/* <BidRegistrationForm /> */}
      {/* {auctions.length > 0 && <BidRegistrationForm  auction={auctions[0]}/>} */}

      {currentProductId && <AuctionForm productId={currentProductId} />}


      <div className="flex flex-col items-center justify-center gap-4 w-full px-6 md:px-12">
        {/* Ongoing Auctions */}
        <h1 className="text-2xl w-full">Ongoing Auctions </h1>
        <div className="flex flex-wrap gap-4 justify-center w-full ">
          {auctions.map((auction) => {
            // if (
            //   auction.startTime < new Date().toISOString() &&
            //   auction.endTime > new Date().toISOString()
            // ) {
            if (auction.status === "Cancelled") return null;
            return <AuctionCard key={auction.id} auction={auction} />;
            // }
          })}
        </div>

        {/* Scheduled Auctions */}
        <h1 className="text-2xl w-full">Scheduled Auctions </h1>
        <div className="flex flex-wrap gap-4 justify-center w-full ">
          {/* {auctions.map((auction) => {
            if (auction.startTime > new Date().toISOString()) {
              return <AuctionCard key={auction.id} auction={auction} />;
            }
          })} */}
        </div>
        <div>
          {myBids.map((bid) => {
            return <p>{bid.amount}</p>;
          })}
        </div>
        <div className="">
          <button
            disabled={currentPage === 1}
            // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-green-500 p-2 cursor-pointer"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className="bg-green-500 p-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
        <div>
          {products.map((product) => (
            <div key={product.id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
              <button
                className="bg-amber-400 p-2 cursor-pointer"
                onClick={() => setCurrentProductId(product.id)}
              >
                Create Auction
              </button>
              <p>{product.imageUrl}</p>
              <img src={BASE_URL + product.imageUrl} alt="" className="w-100" />
              <p className="mb-2 w-70">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
