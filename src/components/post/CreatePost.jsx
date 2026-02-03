import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";

export default function CreatePost({ onCreate }) {
  const [caption, setCaption] = useState("");

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
      <p className="font-semibold text-zinc-900 dark:text-white mb-3">
        Create a post ✨
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Write something pinteresty..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!caption.trim()) return;
            onCreate?.(caption);
            setCaption("");
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
