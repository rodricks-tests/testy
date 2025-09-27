"use client";
import { AuctionCardProps } from "@/lib/types";
import ImageWithFallback from "../ui/ImageWithFallback";
import { useEffect, useState } from "react";
import { connectToHub, disconnectHub } from "@/components/Rbin/SignalRManagerq";
import { IoMdHeart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import Link from "next/link";
import PrimaryToast from "../ui/Toast";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCountdown } from "@/hooks/useCountdown";
import { BASE_URL } from "@/config";
import toast, { Toaster } from "react-hot-toast";
import Button from "../ui/Button";

function AuctionCard({ auction }: { auction: AuctionCardProps }) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const { user } = useAuth();
  const { connection, invoke } = useWebSocket();
  const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
  const isFavorite = user?.favoriteAuctions?.includes(auction.id);
  const {
    id,
    productId,
    productTitle,
    category,
    imageUrl,
    startTime,
    endTime,
    minimumBid,
    status,
    maxBid,
    tags,
  } = auction;

  // Use countdown for start or end time based on status
  const targetTime = status === "Scheduled" ? startTime : endTime;
  const [isLoading, setIsLoading] = useState(true);
  const { timeLeft, isExpired, localTargetTime } = useCountdown(targetTime);

  useEffect(() => {
    setIsLoading(false);
  }, [imageUrl]);

  // To update this
  const subscribeToAuction = () => {
    if (!connection || !user) {
      console.error("No connection or user available");
      return;
    }
    invoke("JoinAuctionGroup", {
      groupIds: [id],
      userId: user?.id,
      data: {},
    });
  };

  const handleLikeClick = () => {
    if (!user) {
      toast.error("Please login to add to favorites");
      return;
    }
    if (!isLike) {
      subscribeToAuction();
    } else {
      disconnectHub("auction" + id);
      invoke("LeaveAuctionGroup", {
        groupIds: [id],
        userId: user?.id,
        data: {},
      });
    }
    setIsLike((prev) => !prev);
  };

  useEffect(() => {
    if (isFavorite) {
      setIsLike(true);
    }
  }, [isFavorite]);

  if (isExpired) return null;

  return (
    <div className="flex flex-col items-center justify-center p-2 shadow-md backdrop-blur-sm shadow-black/20 bg-off-white  text-black w-fit">
      <div className="flex flex-col items-center gap-2 justify-between w-full relative">
        <div className="flex justify-between w-full gap-2 items-end">
          <label
            htmlFor="status"
            className="flex items-center border-2 border-black hover:bg-black hover:text-white rounded-sm cursor-pointer transition-all duration-500 px-2 h-fit"
          >
            <span>{status === "Active" ? "Ongoing" : status}</span>
            {status === "Active" && (
              <span className="w-3 h-3 bg-red-500 rounded-full ml-2 animate-pulse duration-100 transition-all"></span>
            )}
          </label>


          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-500 hover:text-black border-black border-2 cursor-pointer transition-all duration-500"
            onClick={handleLikeClick}
          >
            {isLike ? (
              <IoMdHeart className="text-red-500/80 hover:text-black" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>

        <div
          className={`flex flex-row flex-wrap gap-1 scrollbar-hidden overflow-scroll w-80  ${
            isTagsOpen ? `h-10` : `h-6`
          }    `}
        >
          {tags &&
            tags.map((tag, index) => (
              <div key={index}>
                {index == 0 && (
                  <button
                    className="absolute right-0 bg-background/60 h-5 pl-2 cursor-pointer"
                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                  >
                    <MdMore />
                  </button>
                )}
                <label
                  htmlFor="tag"
                  className="border text-sm h-5 border-black hover:bg-black hover:text-white cursor-pointer transition-all duration-500 px-1 "
                >
                  {tag}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-center max:w-full">
        <h4 className="text-foreground text-sm overflow-x-scroll scrollbar-hidden hover:text-wrap w-80 h-14">{productTitle}</h4>
      </div>
      <div className="flex relative items-center justify-center mb-2 h-60 w-80 bg-cover bg-center overflow-hidden border-e-indigo-900 bg-background/10 rounded-lg">
        {!isLoading && (
          <ImageWithFallback
            src={imageUrl ? BASE_URL + imageUrl : "/default-card-image.png"}
            alt="Picture of the product"
            width={320}
            height={240}
            fallback={
              <div className="w-80 h-60 bg-gray-200/10 flex items-center justify-center animate-pulse">
                <span className="text-gray-500">Image not available</span>
              </div>
            }
          />
        )}
            <span className="absolute top-4 left-4 text-white bg-yellow-700 text-xs px-3 py-1 rounded-full">
          {category}
        </span>

      </div>
      <div className="flex flex-col gap-2 items-center mb-2 rounded-lg w-fit">
        <p className="flex flex-row items-center justify-between px-2 text-lg font-bold bg-gray-200">
          {timeLeft || "Loading..."}
        </p>

        {/* <p className="text-center px-2">
          {status === "Scheduled" ? "Starts in:" : "Ends in:"}{" "}
          {isExpired ? "Auction Ended" : timeLeft || "Loading..."}
        </p> */}
        <p className="text-center px-2 text-sm">
          {status === "Scheduled" ? "Start Time:" : "End Time:"}{" "}
          {localTargetTime || "Loading..."}
        </p>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4>
          Rs. {minimumBid} {maxBid ? "- " + maxBid : ""}
        </h4>
      </div>
      <div className="flex items-center mb-1 justify-between">
        <Link href={`/auction/${id}`} className="w-full">
          <Button >
            View Item
          </Button>
          
        </Link>
      </div>
    </div>
  );
}

export default AuctionCard;
