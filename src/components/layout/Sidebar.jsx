import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 get user from localStorage / context
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const navClass = (path) =>
    `block px-4 py-3 rounded-2xl transition cursor-pointer ${
      location.pathname.startsWith(path)
        ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
        : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
    }`;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 space-y-3">
      <div onClick={() => navigate("/")} className={navClass("/")}>
        🏠 Home
      </div>

      {/* <div
        onClick={() => navigate("/explore")}
        className={navClass("/explore")}
      >
        🔥 Explore
      </div> */}

      <div
        onClick={() => {
          navigate(`/profile/${userId}`);
        }}
      >
        👤 Profile
      </div>

      <div className="rounded-2xl bg-white dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Explore your feed ✨ <br />
          clean + minimal
        </p>
      </div>
    </div>
  );
}
