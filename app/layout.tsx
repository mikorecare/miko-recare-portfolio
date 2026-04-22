import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

// Configure Poppins as main font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins", // This matches the CSS variable
  display: "swap",
});

// Configure Inter as sub font
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter", // This matches the CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miko Test Portfolio 3D",
  description: "First person view with Three.js in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
