// components/PostCard.jsx
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
        <div>
          <h4 className="font-semibold">{post.user}</h4>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="mb-2">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="post" className="rounded-lg w-full" />
      )}
      <div className="flex justify-between mt-2 text-gray-500 text-sm">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </div>
  );
};

export default PostCard;
