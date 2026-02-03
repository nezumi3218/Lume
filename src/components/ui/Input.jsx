export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 ${className}`}
      {...props}
    />
  );
}
