import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory management system",
  description: "SE Case study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className + " flex flex-col"}
        suppressHydrationWarning
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
