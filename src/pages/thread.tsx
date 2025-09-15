import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import axios from "axios";
import { Heart, MessageSquareText, ImageUp, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelative } from "@/utils/formatDate";

interface User {
  id: string;
  username: string;
  name: string;
  profile_picture: string | null;
}

interface ThreadType {
  id: string;
  content: string;
  user: User;
  created_at: string;
  likes: number;
  reply: number;
  isLiked: boolean;
}

function Thread() {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/thread/threads",
          { withCredentials: true }
        );
        setThreads(res.data.data.threads as ThreadType[]);
      } catch (err) {
        console.error("Error fetch threads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>

      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 pt-4">
        <div className="px-5 pb-3 pt-2.5">
          <h1 className="text-3xl font-bold">Home</h1>
        </div>

        <div className="flex items-start gap-3 border-b border-gray-700 pb-3">
          <Textarea
            placeholder="What is happening?!"
            className="flex-1 bg-transparent resize-none outline-none border-none ring-0 focus:ring-0 focus:border-none focus-visible:ring-0 text-white placeholder-gray-400 p-2"
            rows={2}
          />

          <div className="flex items-center gap-2 h-fit">
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden bg-amber-300"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Selected file:", file.name);
                }
              }}
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-700"
                type="button"
              >
                <ImageUp className="w-6 h-6 text-green-400" />
              </Button>
            </label>

            <Button className="px-5  bg-green-600 rounded-2xl font-semibold hover:bg-green-500">
              Post
            </Button>
          </div>
        </div>

        {loading && <p className="text-gray-400">Loading</p>}

        <div className="space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="p-4 border-b border-gray-700 space-y-2"
            >
              <div className="flex items-start space-x-3">
                {thread.user.profile_picture ? (
                  <img
                    src={thread.user.profile_picture}
                    alt={thread.user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-10 h-10 text-gray-400" />
                )}

                <div className="flex-1">
                  <div>
                    <p className="font-semibold">
                      {thread.user.name}{" "}
                      <span className="text-sm text-gray-400">
                        • {formatRelative(thread.created_at)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      @{thread.user.username}
                    </p>
                  </div>

                  <p className="mt-2">{thread.content}</p>

                  <div className="flex space-x-6 text-gray-400 text-sm mt-2">
                    <button
                      className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                        thread.isLiked ? "text-red-500" : ""
                      }`}
                    >
                      <Heart
                        size={18}
                        className={thread.isLiked ? "fill-red-500" : ""}
                      />
                      {thread.likes}
                    </button>

                    <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                      <MessageSquareText size={18} />
                      {thread.reply}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
