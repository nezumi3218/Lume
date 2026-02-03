export default function PostCard({ post }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition">
      <div className="relative">
        <img
          src={post.image}
          alt="post"
          className="w-full object-cover group-hover:scale-[1.02] transition duration-300"
        />

        {/* Hover overlay buttons */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/20 flex items-start justify-end p-3">
          <button className="px-3 py-1 rounded-full bg-white text-black text-sm font-medium">
            Save
          </button>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm text-zinc-900 dark:text-white font-medium line-clamp-2">
          {post.caption}
        </p>

        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          @{post.owner.username}
        </p>
      </div>
    </div>
  );
}
