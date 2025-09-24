import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

interface FollowStatsProps {
  userId: string;
  className?: string;
  showPosts?: boolean;
  isMyProfile?: boolean;
}

function FollowStats({
  userId,
  className = "",
  showPosts = false,
  isMyProfile = false,
}: FollowStatsProps) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const followersUrl = isMyProfile
          ? `${BASE_URL}/api/v1/follows`
          : `${BASE_URL}/api/v1/follows/${userId}`;
        const followersRes = await axios.get(followersUrl, {
          params: { type: "followers" },
          withCredentials: true,
        });
        setFollowersCount(followersRes.data.data.length);

        const followingUrl = isMyProfile
          ? `${BASE_URL}/api/v1/follows`
          : `${BASE_URL}/api/v1/follows/${userId}`;
        const followingRes = await axios.get(followingUrl, {
          params: { type: "following" },
          withCredentials: true,
        });
        setFollowingCount(followingRes.data.data.length);

        if (showPosts) {
          if (isMyProfile) {
            const postsRes = await axios.get(
              `${BASE_URL}/api/v1/thread/threads/me`,
              { withCredentials: true }
            );
            setPostsCount(postsRes.data.data.length);
          } else {
            const postsRes = await axios.get(
              `${BASE_URL}/api/v1/thread/threads/stats/${userId}`,
              { withCredentials: true }
            );
            setPostsCount(postsRes.data.data.length);
          }
        }
      } catch (err) {
        console.error("Failed to fetch follow stats:", err);
      }
    };

    if (userId) {
      fetchCounts();
    }
  }, [userId, showPosts, isMyProfile]);

  return (
    <div
      className={`flex justify-around rounded-2xl p-4 shadow text-center ${className}`}
    >
      {showPosts && (
        <div>
          <p className="text-lg font-semibold text-white">{postsCount}</p>
          <p className="text-gray-400 text-sm">Posts</p>
        </div>
      )}
      <div>
        <p className="text-lg font-semibold text-white">{followersCount}</p>
        <p className="text-gray-400 text-sm">Followers</p>
      </div>
      <div>
        <p className="text-lg font-semibold text-white">{followingCount}</p>
        <p className="text-gray-400 text-sm">Following</p>
      </div>
    </div>
  );
}

export default FollowStats;
