import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "@/store/authSlice";
import FollowStats from "@/components/followStats";
import FollowCard, { type FollowUserType } from "@/components/followCard";

const BASE_URL = "http://localhost:3000";

interface SuggestedUserResponse {
  id: string;
  full_name: string;
  username: string;
  photo_profile?: string | null;
}

function SidebarRight() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<FollowUserType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        dispatch(setCredentials({ token, user: res.data.data }));
      } catch (err) {
        console.error("Failed to fetch user in SidebarRight:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get<{ data: SuggestedUserResponse[] }>(
          `${BASE_URL}/api/v1/search/suggested`,
          { withCredentials: true }
        );

        const data: FollowUserType[] = res.data.data.map((u) => ({
          id: u.id,
          full_name: u.full_name,
          username: u.username,
          profile_picture: u.photo_profile ?? null,
          isFollowing: false,
        }));

        setSuggestedUsers(data);
      } catch (err) {
        console.error("Failed to fetch suggested users:", err);
      }
    };

    fetchSuggestedUsers();
  }, [user?.id]);

  const handleToggleFollow = async (
    userId: string,
    currentlyFollowing: boolean
  ) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/follows`,
        { targetId: userId },
        { withCredentials: true }
      );
      setSuggestedUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !currentlyFollowing } : u
        )
      );
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    }
  };

  const avatarUrl = user?.profile_picture
    ? `${BASE_URL}${user.profile_picture}`
    : null;
  const backgroundUrl = user?.backgroundPhoto
    ? `${BASE_URL}${user.backgroundPhoto}`
    : "https://picsum.photos/400/150";

  if (loading) {
    return (
      <aside className="col-span-3 h-screen sticky top-0 pt-4 border-l border-gray-700 p-4 flex items-center justify-center text-gray-400">
        Loading ...
      </aside>
    );
  }

  return (
    <aside className="col-span-3 h-screen sticky top-0 pt-4 border-l border-gray-700 p-4 space-y-4">
      <div className="bg-[#262626] rounded-2xl shadow overflow-hidden">
        <div className="relative">
          <img
            src={backgroundUrl}
            alt="Background"
            className="w-full h-30 object-cover"
          />
          <div className="absolute -bottom-8 left-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.username}
                className="w-16 h-16 rounded-full border-4 border-[#262626] object-cover shadow-lg"
              />
            ) : (
              <UserCircle className="w-16 h-16 text-gray-400 bg-gray-800 rounded-full border-4 border-[#262626]" />
            )}
          </div>
        </div>

        <div className="mt-10 px-4 pb-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg">{user?.full_name}</p>
            <p className="text-sm text-gray-400">@{user?.username}</p>
          </div>
          <Button
            className="mt-0 w-auto cursor-pointer py-2 rounded-3xl border-2 font-semibold text-white"
            variant="secondary"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </Button>
        </div>

        {user?.id && <FollowStats userId={user.id} className="px-4 pb-4" />}
      </div>

      <div className="bg-[#262626] rounded-2xl p-4 shadow space-y-3">
        <h3 className="text-sm text-gray-400 text-center mb-2">
          Who To Follow
        </h3>
        {suggestedUsers.length > 0 ? (
          suggestedUsers.map((u) => (
            <FollowCard key={u.id} {...u} onToggleFollow={handleToggleFollow} />
          ))
        ) : (
          <p className="text-gray-400 text-center text-sm">No suggestions.</p>
        )}
      </div>

      <div className="bg-[#262626] rounded-2xl p-4 shadow text-center text-sm text-gray-400">
        Developed by <span className="text-green-500">Richard Ganteng</span>
      </div>
    </aside>
  );
}

export default SidebarRight;
