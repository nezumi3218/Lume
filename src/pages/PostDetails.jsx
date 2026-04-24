import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFeedPosts, getSinglePostById } from "../lib/post.js";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Main post
        console.log(id);
        const data = await getSinglePostById(id);

        setPost(data.data);
        setLikesCount(data.data.likes);

        // Fake related posts (replace with backend later)
        // const relData = await getFeedPosts();

        // setRelated(relData.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
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

              {/* Caption */}
              <p className="text-base text-zinc-200">{post?.caption}</p>

              {/* Date */}
              <p className="text-xs text-zinc-500">
                {post?.createdAt ? new Date(post.createdAt).toDateString() : ""}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - RELATED POSTS */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-4 text-zinc-300">
            More like this
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {related.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className="rounded-xl overflow-hidden bg-zinc-800 hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={item.postImage?.url}
                  alt=""
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
