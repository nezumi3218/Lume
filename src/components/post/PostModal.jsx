import Button from "../ui/Button";
import CommentInput from "../comment/CommentInput";
import CommentItem from "../comment/CommentItem";

export default function PostModal({ post, onClose }) {
  if (!post) return null;

  const comments = post.comments || [
    { _id: 1, user: "muskan", text: "this is so pinterest coded 😭✨" },
    { _id: 2, user: "lume", text: "soft vibes only 🖤" },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-100 dark:bg-zinc-900">
            <img
              src={post.image}
              alt="post"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  @{post.owner.username}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {post.caption}
                </p>
              </div>

              <Button variant="ghost" onClick={onClose}>
                ✕
              </Button>
            </div>

            <div className="mt-4 flex-1 overflow-auto space-y-3">
              {comments.map((c) => (
                <CommentItem key={c._id} comment={c} />
              ))}
            </div>

            <div className="mt-4">
              <CommentInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
