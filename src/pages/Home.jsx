// pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

const samplePosts = [
  {
    user: "Alice",
    time: "2h ago",
    content: "Loving React + Tailwind!",
    likes: 12,
    comments: 3,
  },
  {
    user: "Bob",
    time: "4h ago",
    content: "Check out my new design.",
    likes: 8,
    comments: 1,
  },
];

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex max-w-6xl mx-auto pt-4">
        <Sidebar />
        <main className="flex-1 px-4">
          {samplePosts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;
