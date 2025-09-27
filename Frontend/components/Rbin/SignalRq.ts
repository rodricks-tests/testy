import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const auctionId = "521b221d-d664-448c-86cd-8318e67e2e03"; // Replace with dynamic auction ID

export const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:7194/auctionHub") // Match your backend
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build();

connection.start()
  .then(() => {
    console.log("Connected to AuctionHub");
    connection.invoke("JoinAuctionGroup", auctionId)
        .then(() => {console.log(`Joined auction group: ${auctionId}`); })
      .catch(err => console.error("Group join failed:", err));
  })
  .catch(err => console.error("Connection failed:", err));

  connection.on("AuctionStarted", (auctionDto) => {
  console.log("Auction started:", auctionDto);
  // Show toast, update UI, etc.
});

connection.on("NewBidPlaced", (bidDto) => {
  console.log("New bid:", bidDto);
  // Update bid list, highlight new bid
});

connection.on("AuctionEnded", (auctionDto) => {
  console.log("Auction ended:", auctionDto);
  // Show result, disable bidding
});

connection.on("AuctionCancelled", (auctionDto) => {
  console.log("Auction cancelled:", auctionDto);
  // Notify users, redirect if needed
});
