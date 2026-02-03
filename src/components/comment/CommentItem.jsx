export default function CommentItem({ comment }) {
  return (
    <div className="text-sm">
      <span className="font-semibold text-zinc-900 dark:text-white">
        @{comment.user}
      </span>{" "}
      <span className="text-zinc-700 dark:text-zinc-300">{comment.text}</span>
    </div>
  );
}
