import { useMemo, useState } from "react";
import PostGrid from "../components/post/PostGrid";
import PostModal from "../components/post/PostModal";
import Input from "../components/ui/Input";

export default function Explore() {
  const [openPost, setOpenPost] = useState(null);
  const [query, setQuery] = useState("");

  const posts = useMemo(() => {
    return new Array(20).fill(0).map((_, i) => ({
      _id: i + 101,
      image: `https://images.unsplash.com/photo-1520975958225-6f19f98c0c42?w=${
        700 + i
      }`,
      caption: i % 2 === 0 ? "aesthetic dump ✨" : "soft girl era 🖤",
      owner: { username: i % 2 === 0 ? "lume" : "muskan" },
      aspectRatio: i % 3 === 0 ? "4/6" : i % 2 === 0 ? "4/5" : "1/1",
    }));
  }, []);

  const filtered = posts.filter((p) =>
    (p.caption + p.owner.username).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Explore 🔥
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Find new vibes, new creators, new inspo.
        </p>

        <div className="mt-4">
          <Input
            placeholder="Search aesthetic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <PostGrid posts={filtered} onOpen={setOpenPost} />
      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </div>
  );
}
