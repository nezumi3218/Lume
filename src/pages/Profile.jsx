import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PostGrid from "../components/post/PostGrid";
import PostModal from "../components/post/PostModal";
import Button from "../components/ui/Button";

export default function Profile() {
  const { username } = useParams();
  const [openPost, setOpenPost] = useState(null);

  const posts = useMemo(() => {
    return new Array(12).fill(0).map((_, i) => ({
      _id: i + 300,
      image: `https://images.unsplash.com/photo-1520975958225-6f19f98c0c42?w=${
        750 + i
      }`,
      caption: "profile aesthetic ✨",
      owner: { username },
      aspectRatio: i % 3 === 0 ? "4/6" : "4/5",
    }));
  }, [username]);

  return (
    <div>
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              @{username}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              soft vibes • pinterest coded • Lume user ✨
            </p>
          </div>

          <Button onClick={() => alert("Followed (demo)")}>Follow</Button>
        </div>
      </div>

      <PostGrid posts={posts} onOpen={setOpenPost} />
      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </div>
  );
}
