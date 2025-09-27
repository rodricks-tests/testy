"use client";
import { useState, useEffect, use } from "react";
import { useNotifications } from "@/contexts/NotificationContext";

function LiveCountBar() {
  const { liveCount } = useNotifications();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="grid grid-cols-3 gap-2 h-fit w-fit p-2 font-bold rounded-[24px]">
      <div>
        <div className="flex justify-center items-center bg-gold-gradient-t text-gray-900 h-12 w-26 text-center rounded-tl-2xl ">
          <p>
            {" "}
            Online <br />
            Users
          </p>
        </div>
        <div className="flex justify-center items-center bg-white/20 text-white h-12 w-26 rounded-bl-2xl backdrop-blur-md animate-pulse delay-0">
          <p>{liveCount?.userCount ?? 0}</p>
        </div>
      </div>
      <div className="bg-gold-gradient-t text-gray-900 font-bold h-12 w-26 text-center">
        <div>
          <p>Ongoing Auctions</p>
        </div>
        <div className="flex justify-center items-center bg-white/20 text-white h-12 w-26 backdrop-blur-sm  animate-pulse delay-500">
          <p>{liveCount?.ongoingAuctionCount ?? 0}</p>
        </div>
      </div>
      <div className="bg-gold-gradient-t text-gray-900 font-bold h-12 w-26 text-center rounded-tr-2xl">
        <div>
          <p>Upcoming Auctions</p>
        </div>
        <div className="flex justify-center items-center bg-white/20 text-white h-12 w-26 rounded-br-2xl backdrop-blur-sm animate-pulse delay-1000">
          <p className="h-fit">{liveCount?.scheduledAuctionCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
export default LiveCountBar;
