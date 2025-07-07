import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/session-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Makan Apa Kita Hari Ini?",
  description: "Aplikasi rekomendasi makanan yang mobile-centric",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="min-h-screen bg-black max-w-[375px] mx-auto relative">
            <main className="pb-20">{children}</main>
            <MobileNavigation />
            <Toaster position="top-center" />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
