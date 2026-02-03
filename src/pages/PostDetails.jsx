import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
        Post Details
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Post ID: {id}
      </p>

      <p className="mt-4 text-sm">
        This page is ready for your backend integration (get post by id,
        comments, like, save, etc.)
      </p>
    </div>
  );
}
