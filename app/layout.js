import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderSection from "@/components/layout/header";
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
  description: "Online Learning Platforme",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-300">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
              >
            <HeaderSection />
            {children}
            <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
