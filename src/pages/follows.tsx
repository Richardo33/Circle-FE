import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebarRight";
import SidebarCompact from "@/components/sidebarCompact";
import FollowCard, { type FollowUserType } from "@/components/followCard";

const BASE_URL = "http://localhost:3000";

interface ApiFollowUser {
  id: string;
  username: string;
  full_name: string;
  profile_picture: string | null;
  isFollowing: boolean;
}

export default function Follows() {
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );
  const [users, setUsers] = useState<FollowUserType[]>([]);

  const fetchFollows = async (type: "followers" | "following") => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/follows`, {
        params: { type },
        withCredentials: true,
      });

      const data: FollowUserType[] = (res.data.data as ApiFollowUser[]).map(
        (u) => ({
          id: u.id,
          username: u.username,
          full_name: u.full_name,
          profile_picture: u.profile_picture ?? null,
          isFollowing: u.isFollowing,
        })
      );

      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch follows:", err);
    }
  };

  useEffect(() => {
    fetchFollows(activeTab);
  }, [activeTab]);

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

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !currentlyFollowing } : u
        )
      );
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    }
  };

  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-6 space-y-4 pt-4">
        <div className="px-5 pb-3 pt-2.5">
          <h1 className="text-3xl font-bold">Follows</h1>
        </div>

        <div className="flex w-full border-b border-[#3F3F3F]">
          <button
            onClick={() => setActiveTab("followers")}
            className={`mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 cursor-pointer ${
              activeTab === "followers"
                ? "border-[#04A51E] text-green-500"
                : "border-transparent text-gray-400 hover:border-[#04A51E] hover:text-green-500"
            }`}
          >
            <h3>Followers</h3>
          </button>

          <button
            onClick={() => setActiveTab("following")}
            className={`mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 cursor-pointer ${
              activeTab === "following"
                ? "border-[#04A51E] text-green-500"
                : "border-transparent text-gray-400 hover:border-[#04A51E] hover:text-green-500"
            }`}
          >
            <h3>Followings</h3>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <FollowCard
                key={user.id}
                {...user}
                onToggleFollow={handleToggleFollow}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center py-6">No users found.</p>
          )}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}
