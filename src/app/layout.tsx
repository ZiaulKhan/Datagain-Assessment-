import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataGain As",
  description: "DataGain assignment and task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col gap-5 p-5  overflow-hidden h-screen">
        <Providers>
          <Topbar />
          <div className="flex gap-5 h-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto ">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
