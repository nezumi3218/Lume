import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  `block px-4 py-3 rounded-2xl transition ${
    isActive
      ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
      : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
  }`;

export default function Sidebar() {
  return (
    <div className="space-y-3">
      <NavLink to="/" className={navClass}>
        🏠 Home
      </NavLink>
      <NavLink to="/explore" className={navClass}>
        🔥 Explore
      </NavLink>
      <NavLink to="/profile/muskan" className={navClass}>
        👤 Profile
      </NavLink>

      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Pinteresty feed ✨ <br />
          clean + minimal
        </p>
      </div>
    </div>
  );
}
