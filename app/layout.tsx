import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, Fragment_Mono } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "High Council — Stop Claude from agreeing with you",
  description:
    "A Claude Code plugin. Convene a council of adversarial agents on any idea and get one committed verdict, with the strongest argument against it attached.",
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "High Council",
    description: "Stop Claude from agreeing with you. Convene a council, get a verdict.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
