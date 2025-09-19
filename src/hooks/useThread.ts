import { useEffect, useState } from "react";
import axios from "axios";
import type { ThreadDetailType } from "@/types/thread";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:3000";

export function useThread(id?: string) {
  const [thread, setThread] = useState<ThreadDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const fetchThread = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v1/thread/${id}`, {
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
        `${BASE_URL}/api/v1/like/${thread.id}`,
        {},
        { withCredentials: true, headers }
      );
      setThread((prev) =>
        prev
          ? { ...prev, isLiked: res.data.liked, likes: res.data.likes }
          : prev
      );
    } catch (err) {
      console.error("Error liking thread:", err);
    }
  };

  const handleReply = async (reply: string, replyImage?: File | null) => {
    if (!reply.trim() && !replyImage) return;

    try {
      setPosting(true);
      const formData = new FormData();
      formData.append("content", reply);
      if (replyImage) formData.append("replyImage", replyImage);

      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await axios.post(`${BASE_URL}/api/v1/reply/${id}`, formData, {
        withCredentials: true,
        headers,
      });

      await fetchThread();
    } catch (err) {
      console.error("Error posting reply:", err);
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    fetchThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { thread, loading, posting, handleLike, handleReply, fetchThread };
}
