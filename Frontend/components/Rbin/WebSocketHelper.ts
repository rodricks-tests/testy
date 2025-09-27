import { connectToHub, disconnectHub } from "@/components/Rbin/SignalRManagerq";
import { currentUserData } from "@/lib/data";
import { LiveCount } from "@/lib/types";
import { HUB_URLS } from "@/config";
import { useUserStore, useLiveCountStore } from "@/app/stores/useUserStore";

// Define the toast function type
type ToastFn = (message: string, viewLink: string) => void;

export const subscribeToFavAuction = (createToast: ToastFn): void => {
  connectToHub({
    name: "favAuction",
    url: HUB_URLS.auction,
    groupJoin: {
      method: "JoinAuctionGroup",
      sendData: {
        groupIds: currentUserData.favoriteAuctions || [],
        userId: currentUserData.id,
        data: {}, // optional payload
      },
    },
    events: {
      AuctionStarted: (dto) => {
        console.log("Auction started:", dto);
        createToast(
          `Auction started for ${dto.productTitle || "an item"}`,
          `/auction/${dto.id}`
        );
      },
      AuctionEnded: (dto) => {
        console.log("Auction ended:", dto);
        createToast(
          `Auction ended for ${dto.productTitle || "an item"}`,
          `/auction/${dto.id}`
        );
      },
      AuctionCancelled: (dto) => {
        console.log("Auction cancelled:", dto);
        createToast(
          `Auction cancelled for ${dto.productTitle || "an item"}`,
          `/auction/${dto.id}`
        );
      },
    },
  });
};
export const subscribeToUserNotification = (
  createToast: ToastFn,
  favoriteAuctions: string[]
): void => {
  const setLiveCount = useLiveCountStore.getState().setLiveCount;

  connectToHub({
    name: "user",
    url: HUB_URLS.user,
    groupJoin: {
      method: "SubscribeToNotifications",
      sendData: {
        groupIds: favoriteAuctions || [],
        userId: currentUserData.id || "0",
        data: {},
      },
    },
    events: {
      UserSubscribed: (dto) => {
        console.log("user subscribe :", dto);
      },
      UserUnsubscribed: (dto) => {
        console.log("user count :", dto);
      },
      LiveCount: (dto) => {
        console.log("Live count", dto);
        setLiveCount({
          userCount: dto.userCount,
          scheduledAuctionCount: dto.scheduledAuctionCount,
          ongoingAuctionCount: dto.ongoingAuctionCount,
        });
      },
    },
  });
};
