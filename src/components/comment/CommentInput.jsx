import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function CommentInput() {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!text.trim()) return;
          alert("Comment added (demo): " + text);
          setText("");
        }}
      >
        Send
      </Button>
    </div>
  );
}
