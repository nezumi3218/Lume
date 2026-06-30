import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authstore";
import { loginUser } from "../../lib/auth";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const identifier = form.identifier.trim();
      const password = form.password.trim();

      if (!identifier || !password) {
        throw new Error("Please enter email/username and password");
      }
      const payload = identifier.includes("@gmail")
        ? { email: identifier, password }
        : { username: identifier, password };

      const res = await loginUser({ body: payload });

      console.log("login response handle submit", res);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      console.log("after token");
      setAuth({
        user: res.data.user,
        token: res.data.accessToken,
      });

      toast.success("Logged in successfully!!");
      navigate("/", { replace: true });

      console.log("after navigate");
    } catch (err) {
      toast.error("Login failed!");
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
            name="identifier"
            placeholder="Email or Username"
            value={form.identifier}
            onChange={handleChange}
            autoComplete="username"
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
            autoComplete="current-password"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 font-medium transition
                       bg-zinc-900 text-white hover:opacity-90
                       disabled:opacity-60 disabled:cursor-not-allowed
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
