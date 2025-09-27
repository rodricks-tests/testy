import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bidzy - Online Auction Platform",
  description:
    "Bidzy is an online auction platform where users can bid on a variety of products in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hidden`}
      >
        <AuthProvider>
          <NotificationProvider>
            <WebSocketProvider>
              <Toaster />
              {children}

            </WebSocketProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
