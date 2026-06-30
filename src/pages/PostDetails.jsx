import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSinglePostById,
  toggleLikePost,
  getLikesCount,
} from "../lib/post.js";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSinglePostById(id);

        const postData = res.data;

        setPost(postData);
        setLikesCount(postData.likes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      const prevLiked = liked;

      // Optimistic UI
      setLiked(!prevLiked);
      setLikesCount((prev) => (prevLiked ? prev - 1 : prev + 1));

      await toggleLikePost(id);

      const res = await getLikesCount(id);
      setLikesCount(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProfile = (userId) => {
    navigate(`/profile/${post?.owner?.username}`);
  };

  if (loading) {
    return <div className="text-center text-zinc-400 mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - MAIN POST */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-xl">
            {/* Image */}
            <img
              src={post?.postImage?.url}
              alt="post"
              className="w-full max-h-600px object-cover"
            />

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-lg">
                  <button onClick={handleLike}>{liked ? "❤️" : "🤍"}</button>
                  <button>💬</button>
                  <button>🔗</button>
                </div>

                <button className="bg-red-500 px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600">
                  Save
                </button>
              </div>

              {/* Stats */}
              <div className="text-sm text-zinc-400">
                {likesCount} likes • {post?.comments} comments
              </div>

              {/* ✅ USERNAME (FIXED) */}
              <div
                className="text-sm text-zinc-300 cursor-pointer hover:underline"
                onClick={() => getProfile(post?.owner?._id)}
              >
                @{post?.owner?.username}
              </div>

              {/* Caption */}
              <p className="text-base text-zinc-200">{post?.caption}</p>

              {/* Date */}
              <p className="text-xs text-zinc-500">
                {post?.createdAt ? new Date(post.createdAt).toDateString() : ""}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - RELATED POSTS (optional for now) */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-4 text-zinc-300">
            More like this
          </h3>
          <p className="text-zinc-500 text-sm">(Add related posts later)</p>
        </div>
      </div>
    </div>
  );
}
