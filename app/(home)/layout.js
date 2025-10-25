import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/them-provider";

// English font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Arabic script font for Pashto and Dari
const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans",
  subsets: ["arabic"],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: "LarLeed",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable}`}>
      <body className="bg-gray-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}