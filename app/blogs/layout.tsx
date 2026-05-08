"use client";
import "@/styles/blogs.css"
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Prevent body scroll on desktop
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      // Restore body scroll when leaving blog
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <SessionProvider>
      <div className="fixed inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <main className="relative h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </SessionProvider>
  );
}
