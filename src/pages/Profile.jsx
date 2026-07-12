import { useEffect, useState } from "react";
import PostGrid from "../components/post/PostGrid";
import PostModal from "../components/post/PostModal";
import Button from "../components/ui/Button";
import { getCurrentUser, getUserProfile } from "../lib/auth";
import { getUsersPost } from "../lib/post";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let userData;

        if (username) {
          // 👤 Other user's profile
          const res = await getUserProfile(username);
          userData = res.data;
        } else {
          // 🙋 Your profile
          const res = await getCurrentUser();
          userData = res.data;
        }

        setUser(userData);

        // ⚠️ IMPORTANT: you need user._id for posts
        const postRes = await getUsersPost(userData._id);
        setPosts(postRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">User not found</p>;
  }

  return (
    <div>
      {/* 🌄 Cover */}
      <div className="relative h-52 md:h-64 w-full rounded-2xl ">
        <img
          src={user.coverImage?.url}
          alt="cover"
          className="w-full h-full object-cover overflow-hidden"
        />

        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <img
            src={user.avatar?.url}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 object-cover"
          />
        </div>
      </div>

      {/* 👤 Info */}
      <div className="text-center mt-16 mb-6">
        <h2 className="text-xl font-bold">{user.fullname}</h2>
        <p className="text-sm text-zinc-500">{user.username}</p>

        <div className="mt-3 text-sm text-zinc-500">
          <span className="mx-2">
            <b>{posts.length}</b> Posts
          </span>
        </div>

        {/* <div className="mt-4">
          <Button>Follow</Button>
        </div> */}
      </div>

      {/* 📌 POSTS */}
      {posts.length === 0 ? (
        <p className="text-center text-zinc-500">No posts yet 😶</p>
      ) : (
        <PostGrid posts={posts} onOpen={setOpenPost} />
      )}

      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </div>
  );
}
