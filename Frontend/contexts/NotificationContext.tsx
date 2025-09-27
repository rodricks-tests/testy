// src/contexts/NotificationContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import type { PagedResponse, PopulatedNotification } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api";
import { useAuth } from "./AuthContext";
import { BASE_URL } from "@/config";
import { LiveCount } from "@/lib/types";
import toast, { Toaster } from "react-hot-toast";
import PrimaryToast from "@/components/ui/Toast";

interface NotificationContextType {
  notifications: PopulatedNotification[];
  unreadCount: number;
  isLoading: boolean;
  liveCount: LiveCount | null;
  setLiveCount: (data: any) => void;
  addNotification: (notification: PopulatedNotification) => void;
  markAllAsSeen: () => void;
  markAsSeen: (notificationId: string) => void;
  fetchNotifications: () => Promise<void>;
  lastMessageTimestamp: number;
  setLastMessageTimestamp: (timestamp: number) => void;
  loadMoreNotifications: () => void;
  setPageSize: (size: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<PopulatedNotification[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [liveCount, setLiveCount] = useState<LiveCount | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(Date.now());

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}/api/Notification/myNotification?page=${currentPage}&pageSize=${pageSize}`
      );
      if (response.ok) {
        const data: PagedResponse<PopulatedNotification> =
          await response.json();
        setNotifications(data.items);
        setUnreadCount(data.items.filter((n) => !n.isSeen).length);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);

        console.log("Fetched notifications:", data);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
    }
  }, [user, fetchNotifications]);

  const addNotification = useCallback((notification: PopulatedNotification) => {
    createToast(notification);
    setNotifications((prev) => [notification, ...prev]);
    if (!notification.isSeen) {
      setUnreadCount((prev) => prev + 1);
    }
  }, []);
  const loadMoreNotifications = async () => {
    if (currentPage >= totalPages) return;

    setIsLoadingMore(true);
    try {
      const res = await fetchWithAuth(
        `${BASE_URL}/api/Notification/myNotification?page=${
          currentPage + 1
        }&pageSize=${pageSize}`
      );

      if (res.ok) {
        const data :PagedResponse<PopulatedNotification> = await res.json();
        setNotifications((prev) => [...prev, ...data.items]);
        setCurrentPage((prev) => prev + 1);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to load more notification");
      }
    } catch (error) {
      console.error("Error loading more notification:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const markAllAsSeen = useCallback(async () => {
    if (unreadCount > 0) {
      const originalNotifications = [...notifications];
      const originalUnreadCount = unreadCount;

      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

      try {
        const response = await fetchWithAuth(
          BASE_URL + "/api/notification/mark-all-as-seen",
          { method: "PUT" }
        );
        if (!response.ok) {
          // Revert UI on failure
          setNotifications(originalNotifications);
          setUnreadCount(originalUnreadCount);
        }
      } catch (error) {
        // Revert UI on failure
        setNotifications(originalNotifications);
        setUnreadCount(originalUnreadCount);
      }
    }
  }, [unreadCount, notifications]);

  const markAsSeen = useCallback(
    async (notificationId: string) => {
      const notification = notifications.find((n) => n.id === notificationId);
      if (notification && !notification.isSeen) {
        const originalNotifications = [...notifications];
        const originalUnreadCount = unreadCount;

        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));

        try {
          const response = await fetchWithAuth(
            BASE_URL + `/api/notification/mark-as-seen/${notificationId}`,
            { method: "PUT" }
          );
          if (!response.ok) {
            setNotifications(originalNotifications);
            setUnreadCount(originalUnreadCount);
          }
        } catch (error) {
          setNotifications(originalNotifications);
          setUnreadCount(originalUnreadCount);
        }
      }
    },
    [notifications, unreadCount]
  );

  const createToast = (notification: PopulatedNotification) => {
    const filterType = (notification: PopulatedNotification) => {
      switch (notification?.type) {
        case "AUCTIONSTART":
          return `/auction/${notification.link}`;
        case "AUCTIONEND":
          return `/auction/${notification.link}`;
        case "AUCTIONCANCLLED":
          return `/auction/${notification.link}`;
        case "PLACEBID":
          return `/auction/${notification.link}`;
        case "WINBID":
          return `/bid/${notification.link}`;
        case "NEWBID":
          return `/auction/${notification.link}`;
        case "SYSTEM":
          return undefined;
        case "USER":
          return `/profile/${notification.link}`;
        default:
          return undefined;
      }
    };
    const customLink: string | undefined =
      filterType(notification) || undefined;

    console.log("link in nc:", customLink);
    toast.custom(
      (t) => (
        <PrimaryToast
          id={notification.id}
          message={notification.message || "no message found"}
          viewLink={customLink}
          type={notification.type}
          t={t}
          onClose={() => toast.dismiss(t.id)}
        />
      ),
      {}
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        liveCount,
        setLiveCount,
        addNotification,
        markAllAsSeen,
        markAsSeen,
        fetchNotifications,
        lastMessageTimestamp,
        setLastMessageTimestamp,
        loadMoreNotifications,
        setPageSize,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
