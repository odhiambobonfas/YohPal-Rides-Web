import type { Metadata } from "next";
import { Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { YPAuthProvider } from "@/providers/Auth";
import Script from "next/script";

const rubik = Rubik({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yohpal Rides",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${rubik.className} ${geistMono.variable} antialiased`}>
        <YPAuthProvider>
          {children}
        </YPAuthProvider>
      </body>
    </html>
  );
}
