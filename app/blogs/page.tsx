"use client";

import { useEffect, useState, useRef } from "react";
import { getAllBlogPosts, BlogPost } from "@/lib/blog";
import { useSession } from "next-auth/react";
import BlogHeader from "./components/blog-header";
import BlogCard from "./components/blog-card";
// import CreateBlogModal from "./components/create-blog.modal";
import LoginModal from "./components/login.modal";

export default function BlogPage() {
  const { status } = useSession();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchPosts = () => {
    getAllBlogPosts()
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile, posts]);

  const handleCreateClick = () => {
    if (status === "authenticated") {
      setIsCreateModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Mobile view - vertical scroll (normal behavior)
  if (isMobile) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BlogHeader onCreateClick={handleCreateClick} />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts
                .filter((post) => post && post.id)
                .map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    isMobile={true}
                  />
                ))}
            </div>
          )}
        </div>

        {/* <CreateBlogModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchPosts}
        /> */}

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  // Desktop view - NO vertical scroll, only horizontal
  // Filter out any invalid posts
  const validPosts = posts.filter((post) => post && post.slug);
  const [featuredPost, ...otherPosts] = validPosts;
  const midPoint = Math.ceil(otherPosts.length / 2);
  const firstRowPosts = otherPosts.slice(0, midPoint);
  const secondRowPosts = otherPosts.slice(midPoint);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0">
        <BlogHeader onCreateClick={handleCreateClick} />
      </div>

      <div
        ref={scrollContainerRef}
        className="blog-scroll-container flex-1 overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="h-full flex gap-6 px-8 pb-8">
          {/* Featured Post - Largest Card */}
          {featuredPost && featuredPost.slug && (
            <div className="w-[600px] flex-shrink-0 h-full">
              <BlogCard post={featuredPost} index={0} isFeatured={true} />
            </div>
          )}

          {/* Other Posts - Two Rows */}
          {(firstRowPosts.length > 0 || secondRowPosts.length > 0) && (
            <div className="flex flex-col gap-6 h-full">
              {/* First Row */}
              {firstRowPosts.length > 0 && (
                <div className="flex gap-6 flex-1 min-h-0">
                  {firstRowPosts
                    .filter((post) => post && post.slug)
                    .map((post, index) => (
                      <div
                        key={post.id}
                        className="w-[380px] flex-shrink-0 h-full"
                      >
                        <BlogCard post={post} index={index + 1} />
                      </div>
                    ))}
                </div>
              )}

              {/* Second Row */}
              {secondRowPosts.length > 0 && (
                <div className="flex gap-6 flex-1 min-h-0">
                  {secondRowPosts
                    .filter((post) => post && post.slug)
                    .map((post, index) => (
                      <div
                        key={post.id}
                        className="w-[380px] flex-shrink-0 h-full"
                      >
                        <BlogCard post={post} index={midPoint + index + 1} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* 
      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchPosts}
      /> */}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
