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
  X,
} from "lucide-react";
import { formatRelative } from "@/utils/formatDate";
import type { ThreadDetailType } from "@/types/thread";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const BACKEND_URL = "http://localhost:3000";

function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  const [reply, setReply] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);

  const [, setIsPostOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchThread = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/v1/thread/${id}`, {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setThread(res.data.data.thread);
    } catch (err) {
      console.error("Error fetching thread:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLike = async () => {
    if (!thread) return;

    setThread((prev) =>
      prev
        ? {
            ...prev,
            isLiked: !prev.isLiked,
            likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          }
        : prev
    );

    try {
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await axios.post(
        `${BACKEND_URL}/api/v1/like/${thread.id}`,
        {},
        { withCredentials: true, headers }
      );

      console.log("Like response (detail):", res.data);

      setThread((prev) =>
        prev
          ? {
              ...prev,
              isLiked: res.data.liked,
              likes: res.data.likes,
            }
          : prev
      );
    } catch (err) {
      console.error("Error liking thread:", err);

      setThread((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
            }
          : prev
      );
    }
  };

  const handleReply = async () => {
    if (!reply.trim() && !replyImage) return;

    try {
      setPosting(true);

      const formData = new FormData();
      formData.append("content", reply);
      if (replyImage) formData.append("replyImage", replyImage);

      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // console.log("Posting reply — hasImage:", !!replyImage, "content:", reply);

      const res = await axios.post(
        `${BACKEND_URL}/api/v1/reply/${id}`,
        formData,
        {
          withCredentials: true,
          headers,
        }
      );

      console.log("Reply response:", res.data);

      await fetchThread();

      setReply("");
      setReplyImage(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Error posting reply:",
          err.response?.data || err.message
        );
      } else if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="scroll-lock min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar onOpenPost={() => setIsPostOpen(true)} />
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
          <h1 className="text-2xl font-bold">Status</h1>
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
                    <button
                      onClick={handleLike}
                      className="flex items-center gap-2 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={18}
                        className={
                          thread.isLiked ? "fill-red-500 text-red-500" : ""
                        }
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
                <div className="flex items-start gap-3">
                  <Textarea
                    placeholder="What is happening?!"
                    className="flex-1 bg-transparent resize-none outline-none border-none ring-0 focus:ring-0 text-white placeholder-gray-400 p-2"
                    rows={2}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />

                  <div className="flex items-center gap-2 h-fit">
                    <input
                      type="file"
                      accept="image/*"
                      id="replyImageInput"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setReplyImage(file);
                        }
                      }}
                    />

                    <Button
                      variant="secondary"
                      size="icon"
                      type="button"
                      onClick={() =>
                        document.getElementById("replyImageInput")?.click()
                      }
                    >
                      <ImageUp className="w-6 h-6 text-green-400" />
                    </Button>

                    <Button
                      onClick={handleReply}
                      disabled={posting}
                      className="px-5 bg-green-600 rounded-2xl font-semibold hover:bg-green-500 disabled:opacity-50"
                    >
                      {posting ? "Replying..." : "Reply"}
                    </Button>
                  </div>
                </div>

                {replyImage && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(replyImage)}
                        alt="preview"
                        className="max-h-40 rounded-lg border border-gray-700"
                      />
                      <button
                        onClick={() => setReplyImage(null)}
                        className="absolute -top-2 -right-2 bg-black/70 rounded-full p-1 hover:bg-black/90"
                        type="button"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {thread.replies.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {thread.replies.map((r) => (
                  <div key={r.id} className="p-5 flex items-start gap-3">
                    {r.user.profile_picture ? (
                      <img
                        src={`${BACKEND_URL}${r.user.profile_picture}`}
                        alt={r.user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-10 h-10 text-gray-400" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{r.user.name}</p>
                        <p className="text-sm text-gray-400">
                          @{r.user.username}
                        </p>
                        <span className="ml-auto text-xs text-gray-500">
                          {formatRelative(r.created_at)}
                        </span>
                      </div>

                      <p className="mt-2">{r.content}</p>

                      {r.image && (
                        <div className="mt-3">
                          <img
                            src={`${BACKEND_URL}${r.image}`}
                            alt="reply"
                            className="rounded-xl max-h-[400px] object-cover border border-gray-700"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-5 text-gray-500 text-sm">Belum ada reply</p>
            )}
          </>
        )}
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default ThreadDetail;
