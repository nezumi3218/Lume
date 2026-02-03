import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authstore";
import { applyTheme, getInitialTheme } from "../../utils/theme";

export default function Topbar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // Use null initially to wait for theme to load
  const [theme, setTheme] = useState(getInitialTheme());

  // Load initial theme on mount
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    if (!theme) return; // prevent toggle before theme loads
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Prevent rendering until theme is loaded to avoid flicker
  if (!theme) return null;

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <h2 className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Lume
      </h2>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm
                     bg-white dark:bg-zinc-950
                     text-zinc-900 dark:text-zinc-100
                     hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm
                     bg-white dark:bg-zinc-950
                     text-zinc-900 dark:text-zinc-100
                     hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
