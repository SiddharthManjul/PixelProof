import type { Metadata } from "next";
import { Josefin_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WalletStoreProvider } from "../providers/walletStoreProvider";
import { PolkadotWalletsContextProvider } from "../providers/polkadotWalletsContextProvider.client";


// const inter = Inter({ subsets: ["latin"] });
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin"
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: [],
  variable: "--font-grotesk"
});

export const metadata: Metadata = {
  title: "PixelProof",
  description: "Generated by create polka app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PolkadotWalletsContextProvider>
        <body className={`${josefin.variable} ${grotesk.variable}`}>
          <WalletStoreProvider>
            {children}
          </WalletStoreProvider>
        </body>
      </PolkadotWalletsContextProvider>
    </html>
  );
}