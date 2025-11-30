import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Nivi Protocol - Verify, Mint, Rent",
  description: "Decentralized protocol for content verification, minting, and rental",
  keywords: ["blockchain", "content", "verification", "NFT", "rental"],
  authors: [{ name: "Nivi Protocol" }],
  openGraph: {
    title: "Nivi Protocol",
    description: "Decentralized protocol for content verification, minting, and rental",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivi Protocol",
    description: "Decentralized protocol for content verification, minting, and rental",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} antialiased`}
        style={{
          fontFamily: `var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif`,
        }}
      >
        {children}
      </body>
    </html>
  );
}

