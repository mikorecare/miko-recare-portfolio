import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "./hero.css";
import "./book.css";

// Configure Poppins as main font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Configure Inter as sub font
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miko Recare | Medieval Developer Portfolio",
  description:
    "Full-Stack Developer | React | Angular | NestJS | Three.js | Medieval-themed 3D Portfolio",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`}>
      <body className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-900" />
          <div className="absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/50" />
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}