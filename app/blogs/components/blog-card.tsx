"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isFeatured?: boolean;
  isMobile?: boolean;
}

export default function BlogCard({
  post,
  index,
  isFeatured = false,
  isMobile = false,
}: BlogCardProps) {
  if (isMobile) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * (index + 1) }}
        className="group relative bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
      >
        <Link href={`/blogs/${post.slug}`} className="block">
          {/* Cover Image */}
          {post.cover_image && (
            <div className="relative w-full h-50 overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
          
          <div className="p-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 rounded border border-cyan-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-montserrat text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="font-poppins text-gray-400 mb-3 line-clamp-3 text-xs">
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read_time}</span>
              <span>•</span>
              <span>{post.author.split(" ")[0]}</span>
            </div>

            {/* Read more link */}
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold text-xs group-hover:gap-2 transition-all">
                Read More
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (isFeatured) {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="group relative bg-black/30 backdrop-blur-sm rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 overflow-hidden h-full"
      >
        <Link href={`/blogs/${post.slug}`} className="block h-full flex flex-col">
          {/* Cover Image for Featured */}
          {post.cover_image ? (
            <div className="relative w-full h-70 overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          ) : (
            <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
          
          <div className="p-5 flex flex-col flex-1">
            {/* Featured Badge */}
            <div className="mb-3">
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-500/30 rounded">
                Featured
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 rounded border border-cyan-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-montserrat text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-3">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="font-poppins text-gray-300 mb-4 line-clamp-3 text-sm flex-1">
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read_time}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            {/* Read more link */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold text-sm group-hover:gap-2 transition-all">
                Read Full Article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Regular desktop card - Compact with image
  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * (index + 1) }}
      className="group relative bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden h-full hover:scale-105"
    >
      <Link href={`/blogs/${post.slug}`} className="block h-full flex flex-col">
        {/* Cover Image for Regular Card */}
        {post.cover_image && (
          <div className="relative w-full h-50 overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-4 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 rounded border border-cyan-500/30"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-gray-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="font-montserrat text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="font-poppins text-gray-400 mb-3 line-clamp-2 text-xs flex-1">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mb-2">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.read_time}</span>
          </div>

          {/* Read more link */}
          <div className="mt-auto">
            <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold text-xs group-hover:gap-2 transition-all">
              Read
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}