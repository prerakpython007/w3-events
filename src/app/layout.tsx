import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./_components/topNav"; // Updated to match file name casing
import { Saira } from 'next/font/google';
import ElegantCursor from "./_components/mouseTracker";
import { AuthProvider } from "@/app/contexts/authContext";

const saira = Saira({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'] // add the weights you need
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
     <body className={`${saira.className} antialiased bg-[url('/maskgroup.png')] bg-cover bg-center bg-no-repeat relative h-screen`}>
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