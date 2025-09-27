import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/contexts/WebSocketContext";
import Link from "next/link";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { BiData } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { FaGift } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export interface PrimaryToastProps {
  id?: string;
  message: string;
  viewLink?: string;
  error?: boolean;
  type?: string;
  t: any;
  onClose: () => void;
}

const PrimaryToast: React.FC<PrimaryToastProps> = ({
  id,
  message,
  viewLink,
  error = false,
  type = "SYSTEM",
  t,
  onClose,
}) => {
  const { invoke, connection } = useWebSocket();
  const { user } = useAuth();
  // console.log("link:", viewLink);
  const handleSeeNotification = async () => {
    if (user && id && connection) {
      try {
        await invoke("MarkNotificationAsSeen", {
          notificationId: id,
          userId: user.id,
        });
      } catch (error) {
        console.error("Error marking notification as seen:", error);
      }
    }
  };
    return (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} ${
          error ? "bg-red-500/80" : "bg-black/50"
        } max-w-md w-full  backdrop-blur-sm shadow-ls shadow-black/50 rounded-lg ring-1 ring-gold-middle pointer-events-auto flex  transition-all duration-500`}
      >
        <div className="flex-1 p-2 items-center justify-center">
          <button onClick={handleSeeNotification}>
            <Link href={viewLink || "#"} className="w-full">
              <div className="flex items-start ">
                <div className="ring-1 ring-gold-middle p-1 rounded-2xl animate-bounce">
                  {fetchIcon(type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-white">
                    {message?.length > 60
                      ? `${message?.slice(0, 60)}...`
                      : message}
                  </p>
                </div>
              </div>
            </Link>
          </button>
        </div>
        <div className="flex border-l border-gold-middle items-center relative  ">
          <button
            onClick={onClose}
            className="w-full border border-transparent rounded-none rounded-r-lg px-2 flex items-center justify-center text-2xl font-medium text-red-600 hover:text-shadow-amber-200 focus:outline-none focus:ring-2 focus:ring-foreground/30 "
          >
            <IoMdCloseCircleOutline className="" />
          </button>
        </div>
      </div>
    );
};

const fetchIcon = (type: string) => {
  switch (type) {
    case "AUCTIONSTART":
      return <RiAuctionFill />;
    case "AUCTIONEND":
      return <RiAuctionFill />;
    case "AUCTIONCANCLLED":
      return <RiAuctionFill />;
    case "PLACEBID":
      return <BiDollarCircle />;
    case "WINBID":
      return <FaGift />;
    case "NEWBID":
      return <BiDollarCircle />;
    case "SYSTEM":
      return (
        <div className="flex items-center bg-black/50 rounded-full p-2">
          <img className="h-6 w-6" src="/logo.svg" alt="" />
        </div>
      );
    case "USER":
      return <FaUserCircle />;
    default:
      return (
        <div className="flex items-center bg-black/50 rounded-full p-2">
          <img className="h-6 w-6" src="/logo.svg" alt="" />
        </div>
      );
  }
};

export default PrimaryToast;
