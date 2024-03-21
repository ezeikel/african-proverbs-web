import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Lora as FontSerif, Lexend as FontSans } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "@/components/Header/Header";
import { cn } from "@/lib/utils";
import LayoutWrap from "@/components/LayoutWrap/LayoutWrap";
import Providers from "./providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../global.css";

config.autoAddCss = false;

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "African Proverbs",
  description:
    "Dive into the wisdom of Africa with African Proverbs. Discover, share, and contribute to our vast collection of insightful African proverbs. Join our community to explore the rich heritage and timeless wisdom embedded in traditional African sayings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          fontSerif.variable,
          fontSans.variable,
        )}
      >
        <Providers>
          <LayoutWrap>
            <Header className="row-start-1 row-span-1" />
            <main className="row-start-2 row-span-1">{children}</main>
          </LayoutWrap>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
