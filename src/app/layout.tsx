import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./_components/topNav";
import { Saira } from 'next/font/google';
import ElegantCursor from "./_components/mouseTracker";
import { AuthProvider } from "@/app/contexts/authContext";

const saira = Saira({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Web3 Events",
  description: "Your gateway to web3 events",
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${saira.className} antialiased bg-[url('/maskgroup.png')]  bg-black bg-cover bg-center bg-no-repeat relative h-screen`}>
        <ElegantCursor />
        <AuthProvider>
          <TopNav />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}