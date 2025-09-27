// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   HubConnection,
//   HubConnectionBuilder,
//   LogLevel,
// } from "@microsoft/signalr";
// import PrimaryToast from "@/components/ui/Toast";
// import toast, { Toaster } from "react-hot-toast";
// import { useAuth } from "@/contexts/AuthContext";
// import type { LiveCount, PopulatedNotification } from "@/lib/types";
// import { useNotifications } from "@/contexts/NotificationContext";
// import { BASE_URL, HUB_URLS } from "@/config";

// type WebSocketContextType = {
//   connection: HubConnection | null;
//   subscribe: (event: string, handler: (data: any) => void) => void;
//   unsubscribe: (event: string) => void;
//   invoke: (method: string, payload?: any) => Promise<any>;
// };

// const WebSocketContext = createContext<WebSocketContextType | undefined>(
//   undefined
// );

// export const WebSocketProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const { user, token } = useAuth();
//   const { setLiveCount, addNotification } = useNotifications();
//   const [connection, setConnection] = useState<HubConnection | null>(null);
//   const [gConnection, setGConnection] = useState<HubConnection | null>(null);

//   const eventHandlers = useRef<Record<string, (data: any) => void>>({});
//   const connectionInitialized = useRef(false); // Track if connection is initialized
//   const isGuestCon = useRef(false);
//   const isUserCon = useRef(false);

//   useEffect(() => {
//     const doFunc = async () => {
//       await stopConnection();
//     };
//     doFunc();
//   }, [user, token]);

//   useEffect(() => {
//     console.log("use effexct triggerd at user method");
//     if (!user) return; // Prevent re-initialization
//     console.log("use effexct triggerd at user method step 1");

//     if (connectionInitialized.current && isUserCon) return; // Prevent re-initialization
//     console.log("use effexct triggerd at user method step 2");

//     connectionInitialized.current = true; // Mark as initialized
//     isUserCon.current = true;

//     const connect = async () => {
//       const conn = new HubConnectionBuilder()
//         .withUrl(`${BASE_URL}/auctionHub?access_token=${token}`)
//         .configureLogging(LogLevel.Information)
//         .withAutomaticReconnect()
//         .build();

//       Object.entries(eventHandlers.current).forEach(([event, handler]) => {
//         conn.on(event, handler);
//       });

//       try {
//         await conn.start();
//         console.log("✅ SignalR connected");
//         // join group based on user
//         await conn.invoke("SubscribeToNotifications", {
//           groupIds: [],
//           userId: user.id,
//         });

//         setConnection(conn);
//       } catch (err) {
//         console.error("❌ SignalR connection failed:", err);
//         connectionInitialized.current = false; // Allow retry on failure
//         isUserCon.current = false;
//       }
//     };

//     subscribe("LiveCount", setLiveCount);
//     subscribe("ReceiveNotification", handleIncomingNotification);

//     // add initial subscribe before connect
//     connect();
//     return () => {
//       if (connection) {
//         connection.stop();
//         setConnection(null);
//         console.log("🔌 SignalR disconnected");
//         connectionInitialized.current = false;
//         isUserCon.current = false;
//       }
//     };
//   }, [user, token]);

//   // To handle reconnection and re-subscription
//   useEffect(() => {
//     if (!connection) return;

//     connection.onreconnected(async () => {
//       console.log("🔄 SignalR reconnected");
//       await connection.invoke("SubscribeToNotifications", {
//         groupId: [],
//         userId: user?.id,
//         Role: user?.role,
//         SocketId: connection.connectionId,
//       });
//       Object.entries(eventHandlers.current).forEach(([event, handler]) => {
//         connection.on(event, handler);
//       });
//     });
//   }, [connection]);

//   // This effect handles the case when user logout or guest user
//   useEffect(() => {
//     console.log("use effexct triggerd at gueat method");

//     if (user) return;
//     if (connectionInitialized.current && isGuestCon) return;
//     if (connection) return;

//     connectionInitialized.current = true; // Mark as initialized
//     isGuestCon.current = true;

//     const connect = async () => {
//       const conn = new HubConnectionBuilder()
//         .withUrl(HUB_URLS.user)
//         .configureLogging(LogLevel.Information)
//         .withAutomaticReconnect()
//         .build();

//       Object.entries(eventHandlers.current).forEach(([event, handler]) => {
//         conn.on(event, handler);
//       });

//       try {
//         await conn.start();
//         console.log("✅ SignalR connected For user count");

//         // Optional: join group based on user
//         await conn.invoke("SubscribeToNotifications", {
//           groupId: null,
//           SocketId: conn?.connectionId,
//         });

//         setGConnection(conn);
//       } catch (err) {
//         console.error("❌ SignalR connection user Count failed:", err);
//         connectionInitialized.current = false; // Allow retry on failure
//         isGuestCon.current = false;
//       }
//     };
//     // do not append notification for guest user
//     // subscribe("UserSubscribed", createToast);
//     // subscribe("UserUnsubscribed", createToast);
//     subscribe("LiveCount", setLiveCount);

//     // add initial subscribe before connect
//     connect();
//     return () => {
//       if (gConnection) {
//         gConnection.stop();
//         setGConnection(null);
//         console.log("🔌 SignalR disconnected");
//         connectionInitialized.current = false; // Reset for potential reconnect
//         isGuestCon.current = false;
//       }
//     };
//   }, [user, token]);

//   const subscribe = (event: string, handler: (data: any) => void) => {
//     eventHandlers.current[event] = handler;
//     connection?.on(event, handler);
//   };

//   const unsubscribe = (event: string) => {
//     connection?.off(event);
//     delete eventHandlers.current[event];
//   };

//   const stopConnection = async () => {
//     if (!connection) return;
//     await connection.stop();
//     isGuestCon.current = true;
//     isUserCon.current = false;
//     connectionInitialized.current = false;
//     if (!gConnection) return;
//     await gConnection.stop();
//     isGuestCon.current = true;
//     isUserCon.current = false;
//     connectionInitialized.current = false;
//   };

//   const invoke = async (method: string, payload?: any) => {
//     if (!connection) throw new Error("SignalR not connected");
//     return connection.invoke(method, payload);
//   };
//   const createToast = (notification: any) => {
//     toast.custom((t) => (
//       <PrimaryToast
//         id=""
//         message={notification?.message}
//         viewLink={notification?.link ? notification.link : undefined}
//         t={t}
//         onClose={() => toast.dismiss(t.id)}
//       />
//     ));
//   };
//   const handleIncomingNotification = (notification: PopulatedNotification) => {
//     console.log("Received notification:", notification);
//     addNotification(notification);
//   };

//   return (
//     <WebSocketContext.Provider
//       value={{ connection, subscribe, unsubscribe, invoke }}
//     >
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = (): WebSocketContextType => {
//   const context = useContext(WebSocketContext);
//   if (!context) {
//     throw new Error("useWebSocket must be used within a WebSocketProvider");
//   }
//   return context;
// };

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import PrimaryToast from "@/components/ui/Toast";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { LiveCount, PopulatedNotification } from "@/lib/types";
import { useNotifications } from "@/contexts/NotificationContext";
import { BASE_URL, HUB_URLS } from "@/config";

type WebSocketContextType = {
  connection: HubConnection | null;
  subscribe: (event: string, handler: (data: any) => void) => void;
  unsubscribe: (event: string) => void;
  invoke: (method: string, payload?: any) => Promise<any>;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, token } = useAuth();
  const { setLiveCount, addNotification } = useNotifications();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [gConnection, setGConnection] = useState<HubConnection | null>(null);

  const eventHandlers = useRef<Record<string, (data: any) => void>>({});
  const connectionInitialized = useRef(false); // Track if connection is initialized
  // const isGuestCon = useRef(false);
  // const isUserCon = useRef(false);

  useEffect(() => {
    const doFunc = async () => {
      await stopConnection();
    };
    doFunc();
  }, [user, token]);

  useEffect(() => {
    if (user) {
      console.log("use effexct triggerd at user method step 1");
      if (connectionInitialized.current) return; // Prevent re-initialization
      console.log("use effexct triggerd at user method step 2");

      connectionInitialized.current = true; // Mark as initialized
      // isUserCon.current = true;

      const connect = async () => {
        const conn = new HubConnectionBuilder()
          .withUrl(`${BASE_URL}/auctionHub?access_token=${token}`)
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        Object.entries(eventHandlers.current).forEach(([event, handler]) => {
          conn.on(event, handler);
        });

        try {
          await conn.start();
          console.log("✅ SignalR connected");
          // join group based on user
          await conn.invoke("SubscribeToNotifications", {
            groupIds: [],
            userId: user.id,
          });

          setConnection(conn);
        } catch (err) {
          console.error("❌ SignalR connection failed:", err);
          connectionInitialized.current = false; // Allow retry on failure
          // isUserCon.current = false;
        }
      };

      subscribe("LiveCount", setLiveCount);
      subscribe("ReceiveNotification", handleIncomingNotification);

      // add initial subscribe before connect
      connect();
    } else {
      console.log("use effexct triggerd at gueat method");
      if (connectionInitialized.current) return;

      connectionInitialized.current = true; // Mark as initialized
      // isGuestCon.current = true;

      const connect = async () => {
        const conn = new HubConnectionBuilder()
          .withUrl(HUB_URLS.user)
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        Object.entries(eventHandlers.current).forEach(([event, handler]) => {
          conn.on(event, handler);
        });

        try {
          await conn.start();
          console.log("✅ SignalR connected For user count");

          // Optional: join group based on user
          await conn.invoke("SubscribeToNotifications", {
            groupId: null,
            SocketId: conn?.connectionId,
          });

          setConnection(conn);
        } catch (err) {
          console.error("❌ SignalR connection user Count failed:", err);
          connectionInitialized.current = false; // Allow retry on failure
          // isGuestCon.current = false;
        }
      };
      // do not append notification for guest user
      // subscribe("UserSubscribed", createToast);
      // subscribe("UserUnsubscribed", createToast);
      subscribe("LiveCount", setLiveCount);

      // add initial subscribe before connect
      connect();
    }
    return () => {
      if (connection) {
        connection.stop();
        setConnection(null);
        console.log("🔌 SignalR disconnected");
        connectionInitialized.current = false;
        // isUserCon.current = false;
      }
      // if (gConnection) {
      //   gConnection.stop();
      //   setGConnection(null);
      //   console.log("🔌 SignalR disconnected");
      //   connectionInitialized.current = false; // Reset for potential reconnect
      //   isGuestCon.current = false;
      // }
      stopConnection();
    };
  }, [user, token]);

  // To handle reconnection and re-subscription
  useEffect(() => {
    if (!connection) return;

    connection.onreconnected(async () => {
      console.log("🔄 SignalR reconnected");
      await connection.invoke("SubscribeToNotifications", {
        groupId: [],
        userId: user?.id,
        Role: user?.role,
        SocketId: connection.connectionId,
      });
      Object.entries(eventHandlers.current).forEach(([event, handler]) => {
        connection.on(event, handler);
      });
    });
  }, [connection]);

  const subscribe = (event: string, handler: (data: any) => void) => {
    eventHandlers.current[event] = handler;
    connection?.on(event, handler);
  };

  const unsubscribe = (event: string) => {
    connection?.off(event);
    delete eventHandlers.current[event];
  };

  const stopConnection = async () => {
    if (!connection) return;
    await connection.stop();
    // isGuestCon.current = true;
    // isUserCon.current = false;
    connectionInitialized.current = false;
    if (!gConnection) return;
    await gConnection.stop();
    // isGuestCon.current = true;
    // isUserCon.current = false;
    connectionInitialized.current = false;
  };

  const invoke = async (method: string, payload?: any) => {
    if (!connection) throw new Error("SignalR not connected");
    return connection.invoke(method, payload);
  };
  const createToast = (notification: any) => {
    toast.custom((t) => (
      <PrimaryToast
        id=""
        message={notification?.message}
        viewLink={notification?.link ? notification.link : undefined}
        t={t}
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  };
  const handleIncomingNotification = (notification: PopulatedNotification) => {
    console.log("Received notification:", notification);
    addNotification(notification);
  };

  return (
    <WebSocketContext.Provider
      value={{ connection, subscribe, unsubscribe, invoke }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
