import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import HeaderSection from "@/components/layout/header";
import TopBanner from "@/components/layout/tip-banner";
import FooterSection from "@/components/layout/footer";
import { ThemeProvider } from "@/components/them-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LarLeed",
  description: "Online Learning Platform",
};

export default function RootLayout({ children, params }) {
  // Get locale from params or default to 'en'
  const locale = params?.locale || 'en';
  const direction = locale === 'en' ? 'ltr' : 'rtl';
  
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="bg-gray-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TopBanner />
          <HeaderSection />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}