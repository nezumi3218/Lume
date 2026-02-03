import { useEffect, useState } from "react";
import PostCard from "../components/post/PostCard";
import { getFeedPosts } from "../api/post.js";

export default function Home() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getFeedPosts();
      console.log("FEED RESPONSE:", res);

      // 🔥 adapt to your backend response shape
      const postsArray = res?.posts || res?.data || res?.feedPosts || res || [];

      setFeed(Array.isArray(postsArray) ? postsArray : []);
    } catch (err) {
      setError(err?.message || "Could not load feed");
      setFeed([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50  dark:bg-zinc-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Header */}
        <div className="flex items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Your Feed
              <span className="ml-2">🖤</span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Scroll-worthy posts, pinterest energy, main character vibes ✨
            </p>
          </div>

          <button
            onClick={loadFeed}
            className="shrink-0 px-4 py-2 rounded-2xl text-sm font-medium
              bg-zinc-900 text-white dark:bg-white dark:text-zinc-900
              hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Refresh
          </button>
        </div>

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
            <p className="font-semibold text-zinc-900 dark:text-white">
              Feed not loading 😭
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {error}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={loadFeed}
                className="px-4 py-2 rounded-2xl text-sm font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              >
                Try again
              </button>

              <button
                onClick={() => console.clear()}
                className="px-4 py-2 rounded-2xl text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200"
              >
                Clear Console
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="mb-4 break-inside-avoid rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <div
                  className="w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                  style={{ height: `${180 + (i % 5) * 35}px` }}
                />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && feed.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 text-center">
            <p className="text-lg font-semibold text-zinc-900 dark:text-white">
              No posts yet ✨
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Create your first post and your feed will start showing here.
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && feed.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {feed.map((post) => (
              <div key={post._id} className="mb-4 break-inside-avoid">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
