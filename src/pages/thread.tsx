import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import axios from "axios";
import { ImageUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ThreadCard, { type ThreadType } from "@/components/threadCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function Thread() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
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
      const res = await axios.post(
        "http://localhost:3000/api/v1/thread/threads",
        formData,
        { withCredentials: true }
      );

      const newThread: ThreadType = {
        id: res.data.data.tweet.id,
        content: res.data.data.tweet.content,
        image: res.data.data.tweet.image_url,
        user: {
          id: user!.id, // ambil dari Redux store
          username: user!.username,
          name: user!.full_name,
          profile_picture: user!.avatar, // ambil avatar yang sudah ada
        },
        created_at: res.data.data.tweet.timestamp,
        likes: 0,
        reply: 0,
        isLiked: false,
      };

      setThreads((prev) => [newThread, ...prev]); // push di atas
      setContent("");
      removePreview();
      setOpen(false);
    } catch (err) {
      console.error("Error posting thread:", err);
    }
  };

  const removePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/thread/threads",
          { withCredentials: true }
        );
        console.log("Threads fetched:", res.data.data.threads);
        setThreads(res.data.data.threads as ThreadType[]);
      } catch (err) {
        console.error("Error fetch threads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleLike = (id: string) => {
    console.log("Liked thread:", id);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isLiked: !t.isLiked,
              likes: t.isLiked ? t.likes - 1 : t.likes + 1,
            }
          : t
      )
    );
  };

  const handleReply = (id: string) => {
    console.log("Reply to thread:", id);
  };

  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 py-4">
        <div className="px-5 pb-3 pt-2.5">
          <h1 className="text-3xl font-bold">Home</h1>
        </div>

        <div
          className="flex items-start gap-3 border-b border-gray-700 pb-3 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Textarea
            placeholder="What is happening?!"
            className="flex-1 bg-transparent resize-none outline-none border-none ring-0 focus:ring-0 focus:border-none focus-visible:ring-0 text-white placeholder-gray-400 p-2"
            rows={2}
            readOnly
          />

          <div className="flex items-center gap-2 h-fit">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-700 cursor-pointer"
              type="button"
            >
              <ImageUp className="w-6 h-6 text-green-400" />
            </Button>

            <Button className="px-5 bg-green-600 rounded-2xl font-semibold hover:bg-green-500">
              Post
            </Button>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#262626] text-white border border-gray-700 max-w-lg">
            <div className="space-y-3">
              <div className="pb-3 py-5 border-b border-gray-700">
                <Textarea
                  placeholder="What is happening?!"
                  className="w-full bg-transparent resize-none outline-none border-0 focus:border-0 focus:ring-0 text-white placeholder-gray-400"
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
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-700 cursor-pointer"
                  type="button"
                  onClick={handleFileClick}
                >
                  <ImageUp className="w-6 h-6 text-green-400" />
                </Button>
                <Button
                  className="px-5 bg-green-600 rounded-2xl font-semibold hover:bg-green-500"
                  onClick={handlePostThread}
                >
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {loading && <p className="text-gray-400">Loading</p>}

        <div className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onLike={handleLike}
              onReply={handleReply}
            />
          ))}

          {!loading && threads.length === 0 && (
            <p className="text-gray-400 text-center mt-4">
              Belum ada postingan.
            </p>
          )}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Thread;
