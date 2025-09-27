"use client";

import { useEffect } from "react";
import { subscribeToFavAuction } from "@/components/Rbin/WebSocketHelper";
import toast from "react-hot-toast";
import PrimaryToast from "@/components/ui/Toast";
import { PrimaryToastProps } from "@/components/ui/Toast";
import { useUserStore, useLiveCountStore } from "@/app/stores/useUserStore";
import { subscribeToUserNotification } from "@/components/Rbin/WebSocketHelper";

export default function AuctionNotificationListener() {
  const user = useUserStore((state) => state.user);
  const setLiveCount = useLiveCountStore((state) => state.setLiveCount);

  useEffect(() => {
    const cleanup = subscribeToFavAuction((message, viewLink) => {
      toast.custom((t) => (
        <PrimaryToast
          message={message}
          viewLink={viewLink}
          t={t}
          onClose={() => toast.dismiss(t.id)}
        />
      ));
    });

    return cleanup;
  }, []);
  useEffect(() => {
    if (user?.id) {
      subscribeToUserNotification((message, viewLink) => {
        toast.custom((t) => (
          <PrimaryToast
            message={message}
            viewLink={viewLink}
            t={t}
            onClose={() => toast.dismiss(t.id)}
          />
        ));
      }, user.favoriteAuctions || []);
    }
    console.log("this is user:" + user);
  }, [user]);

  return null;
}
