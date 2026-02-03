import PostCard from "./PostCard";

export default function PostGrid({ posts, onOpen }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 column-gap:16px">
      {posts.map((post) => (
        <div key={post._id} className="mb-4 break-inside-avoid">
          <PostCard post={post} onClick={() => onOpen?.(post)} />
        </div>
      ))}
    </div>
  );
}
