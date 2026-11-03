import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Sora } from "next/font/google";
import "./globals.css";

// Same type as the Zoxen website and portal: Sora for headings, Hanken Grotesk for text.
const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"], display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://demo.zoxendigital.com"),
  title: { default: "Our Work | Zoxen Digital", template: "%s | Zoxen Digital" },
  description: "Live websites designed and built by Zoxen Digital, sorted by industry.",
  icons: { icon: "/icon.svg" },
  openGraph: { siteName: "Zoxen Digital", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0b1020" };

// Applies the saved theme (or the device setting on a first visit) before paint, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('zx-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${hanken.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
