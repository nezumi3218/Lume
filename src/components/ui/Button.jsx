export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-2xl font-medium transition active:scale-[0.98]";

  const styles =
    variant === "ghost"
      ? "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white"
      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
