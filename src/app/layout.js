import { Geist, Geist_Mono, Noto_Sans_JP, Jost } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Willeder - 本質的なものづくりを。",
  description: "ただ作るのではなく、成果につながる「本質的なものづくり」を。クリエイト、配信面、LPOの高速PDCAでビジネス成果を最大化します。",
  keywords: "ウェブ制作, デジタルマーケティング, LPO, PDCA, クリエイティブ制作",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}