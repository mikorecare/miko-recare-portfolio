import type { Metadata } from "next";
import { Poppins, Inter, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/hero.css"
import "@/styles/book.css";
import "@/styles/home.css";

// Configure Poppins as main font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Configure Inter as secondary font
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Configure Montserrat for headings and bold statements
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miko Recare | Medieval Developer Portfolio",
  description:
    "Full-Stack Developer | React | Angular | NestJS | Three.js | Medieval-themed 3D Portfolio",
  icons: {
    icon: "/icon.webp",
    apple: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body className="relative min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
