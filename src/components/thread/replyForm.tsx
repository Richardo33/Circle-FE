import { useState, type ChangeEvent, type FormEvent, useRef } from "react";
import { ImageUp, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReplyFormProps {
  onSubmit: (text: string, file?: File) => void;
  posting: boolean;
}

function ReplyForm({ onSubmit, posting }: ReplyFormProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removePreview = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    onSubmit(text, file ?? undefined);
    setText("");
    removePreview();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-b border-gray-700 space-y-3"
    >
      <div className="flex items-center gap-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a reply..."
          disabled={posting}
          className="flex-1 resize-none min-h-[40px] bg-transparent text-white placeholder-gray-400 focus-visible:ring-0 border-none"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleFileClick}
          className="cursor-pointer"
        >
          <ImageUp className="w-16 h-8 text-green-400" />
        </Button>

        <Button
          type="submit"
          disabled={posting}
          className="px-5 bg-green-600 rounded-2xl cursor-pointer font-semibold hover:bg-green-500"
        >
          {posting ? "Posting..." : "Reply"}
        </Button>
      </div>

      {preview && (
        <div className="relative w-fit">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg max-h-60 object-cover border border-gray-700"
          />
          <button
            type="button"
            onClick={removePreview}
            className="absolute -top-2 -right-2 bg-black/70 rounded-full p-1 hover:bg-black"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </form>
  );
}

export default ReplyForm;
