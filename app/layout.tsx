import type { Metadata } from "next";
import { Instrument_Sans, Literata } from "next/font/google";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: {
    default: "EYD V",
    template: "%s | EYD V"
  },
  description: "Referensi belajar Ejaan Bahasa Indonesia Edisi Kelima dengan navigasi, pencarian, dan tampilan baca yang lebih rapi.",
  icons: {
    icon: "/icon/flag-indonesia.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${instrumentSans.variable} ${literata.variable}`}>{children}</body>
    </html>
  );
}
