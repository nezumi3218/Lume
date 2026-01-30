// components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 p-4 space-y-4 hidden lg:block">
      <div className="text-lg font-semibold">Menu</div>
      <ul className="space-y-2">
        <li className="hover:text-purple-600 cursor-pointer">Home</li>
        <li className="hover:text-purple-600 cursor-pointer">Explore</li>
        <li className="hover:text-purple-600 cursor-pointer">Notifications</li>
        <li className="hover:text-purple-600 cursor-pointer">Messages</li>
      </ul>

      <div className="mt-6 text-lg font-semibold">Trending</div>
      <ul className="space-y-2">
        <li className="hover:text-purple-600 cursor-pointer">#React</li>
        <li className="hover:text-purple-600 cursor-pointer">#TailwindCSS</li>
        <li className="hover:text-purple-600 cursor-pointer">#Frontend</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
