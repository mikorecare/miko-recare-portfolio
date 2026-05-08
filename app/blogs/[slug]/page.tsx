"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogPostBySlug, BlogPost } from "@/lib/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    getBlogPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  // Handle body scroll when entering/leaving the page
  useEffect(() => {
    // Save original overflow styles
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;

    // Enable scrolling on this page by making body scroll normally
    // (no need to lock body scroll since this page handles its own scrolling)
    if (!isMobile) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      // Restore original scroll behavior when leaving (from layout)
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, [isMobile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="font-montserrat text-3xl font-bold text-white mb-4">
          Post not found
        </h1>
        <Link
          href="/blogs"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {/* Hero Section with Cover Image (if available) */}
      {post.cover_image && (
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
      )}

      {/* Article Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all posts
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-500/30 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-b border-gray-800 pb-8">
            <div className="flex items-center gap-2">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{post.read_time}</span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-12"
            >
              {section.title && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 pb-2 border-b border-gray-800">
                  {section.title}
                </h2>
              )}
              <div
                className="article-content space-y-6 leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.div>
          ))}
        </div>

        {/* Simple Footer without Share buttons */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-end">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
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
                  d="M3 12h18m-6-6l6 6-6 6"
                />
              </svg>
              More articles
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
