import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "@/utils/socket";
import type { ThreadType } from "@/types/thread";

const BASE_URL = "http://localhost:3000";

export function useThreads() {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchThreads = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/thread/threads`, {
        withCredentials: true,
      });
      setThreads(res.data.data.threads as ThreadType[]);
    } catch (err) {
      console.error("Error fetch threads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
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

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/like/${id}`,
        {},
        { withCredentials: true }
      );
      setThreads((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, isLiked: res.data.liked, likes: res.data.likes }
            : t
        )
      );
    } catch (err) {
      console.error("Error liking thread:", err);
    }
  };

  useEffect(() => {
    fetchThreads();

    const handleNewThread = (newThread: ThreadType) => {
      setThreads((prev) => [newThread, ...prev]);
    };

    socket.on("new-thread", handleNewThread);
    return () => {
      socket.off("new-thread", handleNewThread);
    };
  }, []);

  return { threads, loading, handleLike, fetchThreads };
}
