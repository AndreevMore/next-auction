import type { Metadata } from "next";
import "./globals.css";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Car Auction",
  description: "Browse and bid on car auction lots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${unbounded.className} min-h-screen`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
