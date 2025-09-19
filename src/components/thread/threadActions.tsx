import { Heart, MessageSquareText } from "lucide-react";

interface ThreadActionsProps {
  isLiked: boolean;
  likes: number;
  replies: number;
  onLike?: () => void;
  onReply?: () => void;
}

function ThreadActions({
  isLiked,
  likes,
  replies,
  onLike,
  onReply,
}: ThreadActionsProps) {
  return (
    <div className="flex space-x-6 text-gray-400 text-sm mt-2">
      <button
        onClick={onLike}
        className="flex items-center gap-2 transition-colors hover:text-red-500"
      >
        <Heart
          size={18}
          className={isLiked ? "fill-red-500 text-red-500" : ""}
        />
        {likes}
      </button>

      <button
        onClick={onReply}
        className="flex items-center gap-2 hover:text-green-500 transition-colors"
      >
        <MessageSquareText size={18} />
        {replies}
      </button>
    </div>
  );
}

export default ThreadActions;
