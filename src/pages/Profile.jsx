import { useEffect, useState } from "react";
import PostGrid from "../components/post/PostGrid";
import PostModal from "../components/post/PostModal";
import Button from "../components/ui/Button";
import { getCurrentUser } from "../lib/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCurrentUser();
        const userData = res.data;

        setUser(userData);

        // ⚡ replace later with real posts API
        setPosts([]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      {/* 🌄 Cover Image */}
      <div className="relative h-52 md:h-64 w-full rounded-2xl overflow-hidden">
        <img
          src={user.coverImage?.url}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* 🖼️ Avatar */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <img
            src={user.avatar?.url}
            alt="avatar"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white dark:border-zinc-900 object-cover shadow-lg"
          />
        </div>
      </div>

      {/* 👤 User Info */}
      <div className="text-center mt-16 mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {user.fullname}
        </h2>

        <p className="text-zinc-500 text-sm">{user.username}</p>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          soft vibes • pinterest coded • Lume user ✨
        </p>

        {/* 🔘 Action Button */}
        <div className="mt-4">
          <Button>Follow</Button>
        </div>
      </div>

      {/* 📌 Posts Grid */}
      <PostGrid posts={posts} onOpen={setOpenPost} />
      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </div>
  );
}
