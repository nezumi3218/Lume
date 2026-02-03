export default function Loader({ label = "Loading..." }) {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}
