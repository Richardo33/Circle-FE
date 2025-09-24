import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BASE_URL = "http://localhost:3000";

export type FollowUserType = {
  id: string;
  full_name: string;
  username: string;
  profile_picture: string | null;
  isFollowing?: boolean;
  onToggleFollow?: (userId: string, currentlyFollowing: boolean) => void;
};

function FollowCard({
  id,
  full_name,
  username,
  profile_picture,
  isFollowing = false,
  onToggleFollow,
}: FollowUserType) {
  const avatarSrc = profile_picture ? `${BASE_URL}${profile_picture}` : null;

  return (
    <div className="flex justify-between items-center p-3 rounded-xl shadow">
      <Link to={`/profile/${username}`} className="flex items-center gap-3">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={username}
            className="w-12 h-12 aspect-square rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-semibold">
            {full_name[0]}
          </div>
        )}

        <div className="flex flex-col">
          <span className="font-semibold truncate w-48">{full_name}</span>
          <span className="text-gray-400 text-sm">@{username}</span>
        </div>
      </Link>

      <Button
        size="sm"
        variant={isFollowing ? "outline" : "default"}
        className="cursor-pointer"
        onClick={() => onToggleFollow?.(id, isFollowing)}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}

export default FollowCard;
