import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

type HubConfig = {
  name: string;
  url: string;
  events: Record<string, (data: any) => void>;
  groupJoin?: { method: string; sendData: SendData };
};
type SendData = {
  groupIds: string[];
  userId?: string;
  data?: any;
};

export const connections: Record<string, HubConnection> = {};

export const connectToHub = async (
  config: HubConfig
): Promise<HubConnection> => {
  const { name, url, events, groupJoin } = config;

  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  Object.entries(events).forEach(([eventName, handler]) => {
    connection.on(eventName, handler);
  });

  try {
    await connection.start();
    console.log(`✅ Connected to ${name} hub`);

    if (groupJoin) {
      await connection.invoke(groupJoin.method, groupJoin.sendData);
      console.log(
        `🔗 Joined group ${groupJoin.sendData.groupIds} on ${name} hub`
      );
    }

    connections[name] = connection;
    return connection;
  } catch (err) {
    console.error(`❌ Failed to connect to ${name} hub:`, err);
    throw err;
  }
};

export const getHubConnection = (name: string): HubConnection | undefined =>
  connections[name];

export const disconnectHub = async (name: string): Promise<void> => {
  const conn = connections[name];
  if (conn) {
    await conn.stop();
    console.log(`🔌 Disconnected from ${name} hub`);
    delete connections[name];
  }
};

export const leaveHub = async (
  conName: string,
  sendData: SendData
): Promise<void> => {
  const conn = connections[conName];
  if (conn) {
    await conn.invoke("LeaveAuctionGroup", sendData);
    console.log(`🔌 Disconnected from ${conName} hub:`,sendData);
  }
};
