import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../lib/auth";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!avatar) {
        throw new Error("Avatar is required");
      }

      const fd = new FormData();
      fd.append("fullname", form.fullname.trim());
      fd.append("username", form.username.trim());
      fd.append("email", form.email.trim());
      fd.append("password", form.password.trim());

      // ✅ must match backend: req.files.avatar
      fd.append("avatar", avatar);

      // ✅ optional: req.files.coverImage
      if (coverImage) {
        fd.append("coverImage", coverImage);
      }

      const res = await registerUser({ body: fd });
      // console.log("register Response", res);

      toast.success(res.message || "OTP sent to your email!");

      navigate("/verify-email", {
        state: {
          email: form.email,
        },
      });

      // localStorage.setItem("accessToken", res.accessToken);
      // localStorage.setItem("refreshToken", res.refreshToken);

      
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Register</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Create your account ✨
        </p>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                       bg-white dark:bg-zinc-950
                       text-zinc-900 dark:text-zinc-100
                       px-4 py-3 text-sm outline-none
                       focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                       bg-white dark:bg-zinc-950
                       text-zinc-900 dark:text-zinc-100
                       px-4 py-3 text-sm outline-none
                       focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            name="username"
            placeholder="Username (example: two or @two)"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                       bg-white dark:bg-zinc-950
                       text-zinc-900 dark:text-zinc-100
                       px-4 py-3 text-sm outline-none
                       focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            name="email"
            placeholder="Email"
            value={form.email}
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

          {/* ✅ Avatar (required) */}
          <div className="grid gap-1">
            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Avatar (required)
            </label>
            <input
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                         bg-white dark:bg-zinc-950
                         text-zinc-900 dark:text-zinc-100
                         px-4 py-3 text-sm outline-none
                         file:mr-3 file:rounded-lg file:border-0
                         file:bg-zinc-900 file:text-white
                         dark:file:bg-white dark:file:text-zinc-900"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              required
            />
          </div>

          {/* ✅ Cover Image (optional) */}
          <div className="grid gap-1">
            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Cover Image (optional)
            </label>
            <input
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800
                         bg-white dark:bg-zinc-950
                         text-zinc-900 dark:text-zinc-100
                         px-4 py-3 text-sm outline-none
                         file:mr-3 file:rounded-lg file:border-0
                         file:bg-zinc-900 file:text-white
                         dark:file:bg-white dark:file:text-zinc-900"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl px-4 py-3 font-medium transition
                       bg-zinc-900 text-white hover:opacity-90
                       disabled:opacity-60 disabled:cursor-not-allowed
                       dark:bg-white dark:text-zinc-900"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
          Already have an account?{" "}
          <Link
            className="underline text-zinc-900 dark:text-zinc-100"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
