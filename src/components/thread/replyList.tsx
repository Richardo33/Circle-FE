import { UserCircle } from "lucide-react";
import { formatRelative } from "@/utils/formatDate";

const BASE_URL = "http://localhost:3000";

interface Reply {
  id: string;
  content: string;
  image?: string | null;
  created_at: string;
  user: {
    name: string;
    username: string;
    profile_picture?: string | null;
  };
}

interface ReplyListProps {
  replies: Reply[];
}

function ReplyList({ replies }: ReplyListProps) {
  if (replies.length === 0) {
    return <p className="p-5 text-gray-500 text-sm">Belum ada reply</p>;
  }

  return (
    <div className="divide-y divide-gray-800">
      {replies.map((r) => (
        <div key={r.id} className="p-5 flex items-start gap-3">
          {r.user.profile_picture ? (
            <img
              src={`${BASE_URL}${r.user.profile_picture}`}
              alt={r.user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-10 h-10 text-gray-400" />
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{r.user.name}</p>
              <p className="text-sm text-gray-400">@{r.user.username}</p>
              <span className="ml-auto text-xs text-gray-500">
                {formatRelative(r.created_at)}
              </span>
            </div>

            <p className="mt-2">{r.content}</p>

            {r.image && (
              <div className="mt-3">
                <img
                  src={`${BASE_URL}${r.image}`}
                  alt="reply"
                  className="rounded-xl max-h-[400px] object-cover border border-gray-700"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReplyList;
