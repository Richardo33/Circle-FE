import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, X } from "lucide-react";
import axios from "axios";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreatePostDialog({
  open,
  onOpenChange,
}: CreatePostDialogProps) {
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  const removePreview = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePostThread = async () => {
    if (!content && !fileInputRef.current?.files?.[0]) {
      return alert("Isi content atau pilih gambar!");
    }

    const formData = new FormData();
    formData.append("content", content);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/thread/threads",
        formData,
        {
          withCredentials: true,
        }
      );

      setContent("");
      removePreview();
      onOpenChange(false);
    } catch (err) {
      console.error("Error posting thread:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="bg-[#262626] text-white border border-gray-700 max-w-lg">
        <div className="space-y-3">
          <div className="pb-3 py-5 border-b border-gray-700">
            <Textarea
              placeholder="What is happening?!"
              className="w-full bg-transparent resize-none outline-none border-0 focus:border-0 focus:ring-0 text-white placeholder-gray-400 caret-green-600"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {preview && (
            <div className="relative w-fit">
              <img
                src={preview}
                alt="Preview"
                className="rounded-lg max-h-60 object-cover border border-gray-700"
              />
              <button
                onClick={removePreview}
                className="absolute -top-2 -right-2 bg-black/70 rounded-full p-1 hover:bg-black"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="secondary"
              className="cursor-pointer"
              size="icon"
              onClick={handleFileClick}
            >
              <ImageUp className="w-6 h-6 text-green-400 cursor-pointer" />
            </Button>
            <Button
              className="px-5 bg-green-600 rounded-2xl cursor-pointer font-semibold hover:bg-green-500"
              onClick={handlePostThread}
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
