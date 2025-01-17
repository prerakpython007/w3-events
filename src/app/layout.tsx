import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./_components/topNav"; // Updated to match file name casing

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3 Events",
  description: "Your gateway to web3 events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-[url('/maskgroup.png')] bg-cover bg-center bg-no-repeat relative h-screen`}
      
      >
        <TopNav />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}