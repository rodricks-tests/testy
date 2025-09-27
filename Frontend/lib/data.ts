import type { AuctionCardProps, Product, UserData } from "./types";

// export const auctionCardData: AuctionCardProps[] = [
//   {
//     id: "1",
//     productId: "101",
//     productTitle: "Vintage Watch",
//     imageUrl: "/watch.png", // Example image URL
//     startTime: "2023-10-01T10:00:00Z",
//     endTime: "2023-10-01T12:00:00Z",
//     minimumBid: 100,
//     status: "Active",
//     maxBid: 150,
//   },
//   {
//     id: "2",
//     productId: "102",
//     productTitle: "Antique Vase",
//     imageUrl: "/vase.png", // Example image URL
//     startTime: "2023-10-02T10:00:00Z",
//     endTime: "2023-10-02T12:00:00Z",
//     minimumBid: 200,
//     status: "Scheduled",
//     maxBid: 0,
//   },
//   {
//     id: "3",
//     productId: "103",
//     productTitle: "Classic Car",
//     imageUrl: "/car.png", // Example image URL
//     startTime: "2023-10-03T10:00:00Z",
//     endTime: "2023-10-03T12:00:00Z",
//     minimumBid: 5000,
//     status: "Ended",
//     maxBid: 6000,
//   },
//   {
//     id: "4",
//     productId: "104",
//     productTitle: "Rare Coin",
//     imageUrl: "/coin.png", // Example image URL
//     startTime: "2023-10-04T10:00:00Z",
//     endTime: "2023-10-04T12:00:00Z",
//     minimumBid: 50,
//     status: "Cancelled",
//     maxBid: 0,
//   },
// ];

const baseUrl = "https://localhost:7194/api/auction";
export const fetchAuctionData = async (): Promise<AuctionCardProps[]> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch auction data");
  }
  const data: AuctionCardProps[] = await response.json();
  return data;
};

export const currentUserData: UserData = {
  id: "6210cc0f-d212-41b6-8042-c3b2cc42281f",
  fullName: "Tharindu Mendis",
  email: "tharindumendis100@gmail.com",
  phone: "0740304922",
  role: "Seller",
  createdAt: "0001-01-01T00:00:00",
  favoriteAuctions: ["338a2831-71b9-487c-b072-4a9a3da7d06c"],
};

// export const currentUserData: UserData = {
// };
