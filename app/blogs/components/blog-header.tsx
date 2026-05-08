"use client";

import { motion } from "framer-motion";

interface BlogHeaderProps {
  onCreateClick: () => void;
}

export default function BlogHeader({ onCreateClick }: BlogHeaderProps) {
  // const { status } = useSession();

  return (
    <div className="text-center py-3 px-4 border-b border-cyan-500/20 bg-black/20 backdrop-blur-sm mb-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <h1 className="font-montserrat text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Blogs
          </h1>
          <span className="hidden md:inline-block px-2 py-0.5 text-xs font-mono text-cyan-400 bg-cyan-400/10 rounded border border-cyan-500/30">
            Thoughts & Tutorials
          </span>
        </motion.div>

        {/* Right side - Buttons */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          <button
            onClick={onCreateClick}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition text-sm"
          >
            + New Post
          </button>

          {status === "authenticated" && (
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition text-sm"
            >
              Sign Out
            </button>
          )}
        </motion.div> */}
      </div>
    </div>
  );
}
