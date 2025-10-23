import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  icons: {
    icon: "/globe.svg",
  },
  title: "UTEShop Admin",
  description: "Admin dashboard for UTEShop e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Header />
        <div className="flex">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
