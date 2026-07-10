import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authstore";
import { applyTheme, getInitialTheme } from "../../utils/theme";
import { getCurrentUser, logoutUser } from "../../lib/auth";

export default function Topbar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Use null initially to wait for theme to load
  const [theme, setTheme] = useState(getInitialTheme());

  const [icon, setIcon] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const profileIcon = async () => {
      try {
        const res = await getCurrentUser();
        setIcon(res.data.avatar.url);
      } catch (error) {
        console.log("Couldn't fetch the profile icon");
      }
    };

    profileIcon();
  }, []);

  // Load initial theme on mount
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const createPost = () => {
    navigate("/create-post");
  };

  const toggleTheme = () => {
    if (!theme) return; // prevent toggle before theme loads
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(); // clear zustand state if needed
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Prevent rendering until theme is loaded to avoid flicker
  if (!theme) return null;

  const navClass = (path) =>
    `block px-4 py-3 rounded-2xl transition cursor-pointer ${
      location.pathname.startsWith(path)
        ? "bg-white dark:bg-black text-pink-500 dark:text-pink-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        : "bg-zinc-900 text-white dark:bg-white dark:text-black"
    }`;

  return (
    <>
      <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <h2 className="font-semibold tracking-tight text-xl">
          <div onClick={() => navigate("/")} className={navClass("/")}>
            Lume
          </div>
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={createPost}
            className="w-10 h-10 flex items-center justify-center rounded-full
           bg-white dark:bg-zinc-950
           text-zinc-900 dark:text-zinc-100
           ring-2 ring-transparent
           hover:ring-pink-500
           hover:scale-105
           transition-all duration-200
           cursor-pointer"
          >
            +
          </button>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full
           bg-white dark:bg-zinc-950
           text-zinc-900 dark:text-zinc-100
           ring-2 ring-transparent
           hover:ring-pink-500
           hover:scale-105
           transition-all duration-200
           cursor-pointer"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <img
            src={icon || "/default-avatar.png"}
            alt="Profile"
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all duration-200"
          />
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 h-10 flex items-center justify-center rounded-full
    bg-white dark:bg-zinc-950
    text-zinc-900 dark:text-zinc-100
    ring-2 ring-transparent
    hover:ring-pink-500
    hover:scale-105
    transition-all duration-200
    cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Log out?
            </h2>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Are you sure you want to log out?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  setShowLogoutModal(false);
                  await handleLogout();
                }}
                className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
