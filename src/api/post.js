export async function getFeedPosts() {
  const res = await fetch("http://localhost:8000/api/v1/posts/feed-posts", {
    method: "GET",
    credentials: "include", // important if you use cookies/auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feed posts");
  }

  return res.json();
}
