export type AuctionCardProps = {
  id: string;
  productId: string;
  productTitle: string;
  description: string;
  sellerId: string;
  imageUrl?: string; // Optional, can be added later
  startTime: string;
  endTime: string;
  minimumBid: number;
  status: AuctionStatus;
  category: AuctionCategory;
  maxBid?: number;
  tags?: string[];
  winnerId? : string;
};
export type AuctionCategory =
  | "Art"
  | "Antiques"
  | "Jewelry"
  | "Collectibles"
  | "Furniture"
  | "BooksAndManuscripts"
  | "Fashion"
  | "Automobiles"
  | "WineAndSpirits"
  | "Photography"
  | "Other";

  export const categories = [
  "Art",
  "Antiques",
  "Jewelry",
  "Collectibles",
  "Furniture",
  "BooksAndManuscripts",
  "Fashion",
  "Automobiles",
  "WineAndSpirits",
  "Photography",
  "Other"
];

export type AuctionStatus = "Scheduled" | "Active" | "Ended" | "Cancelled";
// This type represents the structure of a product in the auction system. ##can be changed later
export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sellerId: string;
  seller?: UserData;
  tags?: string[];
};
export type UserData = {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: "Seller" | "Bidder";
  createdAt?: string; // ISO date string
  favoriteAuctions?: string[];
};
export type LiveCount = {
  userCount: number;
  scheduledAuctionCount: number;
  ongoingAuctionCount: number;
};
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  imageUrl: string;
  role: "Seller" | "Bidder";
  createdAt: string;
  favoriteAuctions?: string[];
};

export type NotificationType =
  | "AUCTIONSTART"
  | "AUCTIONEND"
  | "AUCTIONCANCLLED"
  | "PLACEBID"
  | "WINBID"
  | "NEWBID"
  | "SYSTEM"
  | "USER";

export type Notification = {
  id: string;
  type: NotificationType;
  userId: string;
  timestamp: number;
  isSeen: boolean;
  link: string;
  message: string | null;
};

export type BidReadDto = {
  id: string; // Guid -> string
  auctionId: string; // Guid -> string
  bidderId: string; // Guid -> string
  bidderName: string;
  amount: number; // decimal -> number
  timestamp: string; // DateTime -> string (ISO format from API)
};

export type Auction = {
  id: string; // Guid -> string
  productId: string; // Guid -> string
  productTitle: string;
  description: string;
  tags: string[];
  imageUrl: string;
  startTime: string; // DateTime -> string
  endTime: string; // DateTime -> string
  minimumBid: number;
  status: AuctionStatus;
  category: AuctionCategory;
  winBid: BidReadDto | null; // nullable object
  bids: BidReadDto[];
  viewCount: number;
  likeCount: number;
  participationCount: number;
};

export type SellerProduct = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price?: number; // optional price info
  stock?: number; // optional stock info
};

export interface PopulatedNotification extends Notification {
  actor?: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}

export type Bid = {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  timestamp: string;
};
export interface BidDetail extends Bid {
  title?: string;
  bidderName?: string;
  bidderImageUrl?: string;
}
export type PagedResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
};

export type AppReview ={
  id ?: string;
  userId ?:string;
  fullName :string;
  rating: any;
  comment: string;
  createAt?: string;
}
