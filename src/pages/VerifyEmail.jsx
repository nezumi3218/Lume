import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmail, resendOTP } from "../lib/auth"; // adjust path if needed

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyEmail({
        email,
        otp,
      });

      toast.success(res.data.message || "Email verified successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found.");
      return;
    }

    try {
      await resendOTP({
        email,
      });

      toast.success("A new OTP has been sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-white">
          Verify Email
        </h1>

        <p className="mt-3 text-center text-zinc-600 dark:text-zinc-400">
          We've sent a verification code to
        </p>

        <p className="mt-1 text-center font-medium text-pink-500 break-all">
          {email}
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 py-3 text-white font-medium hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={timer > 0}
            className={`text-sm transition ${
              timer > 0
                ? "text-zinc-400 cursor-not-allowed"
                : "text-pink-500 hover:underline"
            }`}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
