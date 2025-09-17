import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import {
  Heart,
  MessageSquareText,
  UserCircle,
  ArrowLeft,
  ImageUp,
} from "lucide-react";
import { formatRelative } from "@/utils/formatDate";
import type { ThreadType } from "@/components/threadCard";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BACKEND_URL = "http://localhost:3000";

function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  // Ambil user dari Redux
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/thread/${id}`, {
          withCredentials: true,
        });
        setThread(res.data.data.thread);
      } catch (err) {
        console.error("Error fetching thread:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleReply = async () => {
    if (!reply.trim()) return;

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/thread/${id}/reply`,
        { content: reply },
        { withCredentials: true }
      );
      setReply("");
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  return (
    <div className="scroll-lock min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 py-4">
        <div className="px-5 pb-3 pt-2.5 flex items-center gap-3">
          <button
            onClick={() => navigate("/thread")}
            className="hover:text-gray-300"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-bold">Thread Detail</h1>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && !thread && (
          <p className="text-red-500">Thread tidak ditemukan</p>
        )}

        {thread && (
          <>
            <div className="p-5 border-b border-gray-700 space-y-3">
              <div className="flex items-start space-x-3">
                {thread.user.profile_picture ? (
                  <img
                    src={`${BACKEND_URL}${thread.user.profile_picture}`}
                    alt={thread.user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-12 h-12 text-gray-400" />
                )}

                <div className="flex-1">
                  <p className="font-semibold">{thread.user.name}</p>
                  <p className="text-sm text-gray-400">
                    @{thread.user.username}
                  </p>

                  <div className="mt-3">
                    <p className="text-lg">{thread.content}</p>
                    {thread.image && (
                      <div className="mt-3">
                        <img
                          src={`${BACKEND_URL}${thread.image}`}
                          alt="thread"
                          className="rounded-xl max-h-[500px] object-cover border border-gray-700"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-6 text-gray-400 text-sm mt-4">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
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

                    <span className="ml-auto text-xs text-gray-500">
                      {formatRelative(thread.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-b border-gray-700 flex items-start gap-3">
              {user?.avatar ? (
                <img
                  src={`${BACKEND_URL}${user.avatar}`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400" />
              )}

              <div className="flex-1">
                <div className="flex items-start gap-3 pb-3">
                  <Textarea
                    placeholder="What is happening?!"
                    className="flex-1 bg-transparent resize-none outline-none border-none ring-0 focus:ring-0 text-white placeholder-gray-400 p-2"
                    rows={2}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <div className="flex items-center gap-2 h-fit">
                    <Button variant="ghost" size="icon">
                      <ImageUp className="w-6 h-6 text-green-400" />
                    </Button>
                    <Button
                      onClick={handleReply}
                      className="px-5 bg-green-600 rounded-2xl font-semibold hover:bg-green-500"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Sidebar kanan */}
      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default ThreadDetail;
