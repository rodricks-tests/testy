"use client";

import { useEffect } from "react";
import { subscribeToUserNotification } from "@/components/Rbin/WebSocketHelper";
import toast from "react-hot-toast";
import PrimaryToast from "@/components/ui/Toast";
import { PrimaryToastProps } from "@/components/ui/Toast";

export default function UserNotificationListener() {
  useEffect(() => {
    const cleanup = subscribeToUserNotification(
      (message, viewLink) => {
        toast.custom((t) => (
          <PrimaryToast
            message={message}
            viewLink={viewLink}
            t={t}
            onClose={() => toast.dismiss(t.id)}
          />
        ));
      },
      [""]
    );

    return cleanup;
  }, []);

  return null;
}
