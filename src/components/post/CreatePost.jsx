import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { uploadPost } from "../../lib/post";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!caption.trim() || !image) {
      alert("Caption and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("postImage", image);

    try {
      setLoading(true);

      const res = await uploadPost(formData);

      console.log("Post created:", res);

      // Reset form
      setCaption("");
      setImage(null);
      setPreview(null);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 mb-6 shadow-sm">
      <p className="font-semibold text-lg text-zinc-900 dark:text-white mb-4">
        Create a Post ✨
      </p>

      {/* Image Upload */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl h-52 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          <div className="text-center text-zinc-500">
            <p className="text-sm">Click to upload image</p>
            <p className="text-xs">PNG, JPG supported</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* Caption */}
      <div className="mt-4">
        <Input
          placeholder="Write something aesthetic..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
