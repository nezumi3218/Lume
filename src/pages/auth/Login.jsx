import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authstore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(form);

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setAuth({ token: data.data.accessToken, user: data.data.user });
      // console.log(data.data.accessToken, data.data.user);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Login</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Welcome back 💖
        </p>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                       bg-white dark:bg-zinc-950
                       text-zinc-900 dark:text-zinc-100
                       px-4 py-3 text-sm outline-none
                       focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            name="email"
            placeholder="Enter email"
            value={form.email?.trim()}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                       bg-white dark:bg-zinc-950
                       text-zinc-900 dark:text-zinc-100
                       px-4 py-3 text-sm outline-none
                       focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 font-medium transition
                       bg-zinc-900 text-white hover:opacity-90
                       dark:bg-white dark:text-zinc-900"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
          Don’t have an account?{" "}
          <Link
            className="underline text-zinc-900 dark:text-zinc-100"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
