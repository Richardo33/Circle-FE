import { Heart, MessageSquareText, UserCircle } from "lucide-react";
import { formatRelative } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import type { ThreadType } from "@/types/thread";

const BASE_URL = "http://localhost:3000";

interface ThreadCardProps {
  thread: ThreadType;
  onLike?: (id: string) => void;
  onReply?: (id: string) => void;
}

function ThreadCard({ thread, onLike, onReply }: ThreadCardProps) {
  const avatarUrl = thread.user.profile_picture
    ? `${BASE_URL}${thread.user.profile_picture}`
    : null;

  const threadImageUrl = thread.image ? `${BASE_URL}${thread.image}` : null;

  return (
    <div className="p-4 border-b border-gray-700 space-y-2">
      <div className="flex items-start space-x-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={thread.user.username}
            className="w-10 h-10 rounded-full object-cover border-none"
          />
        ) : (
          <UserCircle className="w-10 h-10 text-gray-400" />
        )}

        <div className="flex-1">
          <Link to={`/thread/${thread.id}`}>
            <div>
              <p className="font-semibold">
                {thread.user.name}{" "}
                <span className="text-sm text-gray-400">
                  • {formatRelative(thread.created_at)}
                </span>
              </p>
              <p className="text-sm text-gray-400">@{thread.user.username}</p>
            </div>

            <p className="mt-2">{thread.content}</p>

            {threadImageUrl && (
              <div className="mt-3">
                <img
                  src={threadImageUrl}
                  alt="Thread attachment"
                  className="rounded-xl max-h-96 object-cover border border-gray-700"
                />
              </div>
            )}
          </Link>

          <div className="flex space-x-6 text-gray-400 text-sm mt-2">
            <button
              onClick={() => onLike?.(thread.id)}
              className="flex items-center gap-2 transition-colors hover:text-red-500"
            >
              <Heart
                size={18}
                className={thread.isLiked ? "fill-red-500 text-red-500" : ""}
              />
              {thread.likes}
            </button>

            <button
              onClick={() => onReply?.(thread.id)}
              className="flex items-center gap-2 hover:text-green-500 transition-colors"
            >
              <MessageSquareText size={18} />
              {thread.reply}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadCard;
