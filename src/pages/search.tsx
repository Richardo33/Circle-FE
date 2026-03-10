import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebarRight";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import SidebarCompact from "@/components/sidebarCompact";
import FollowCard, { type FollowUserType } from "@/components/followCard";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiUser {
  id: string;
  username: string;
  full_name: string;
  profile_picture: string | null;
  isFollowing: boolean;
}

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<FollowUserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (keyword.trim()) {
        fetchUsers(keyword);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  const fetchUsers = async (q: string) => {
    try {
      setLoading(true);

      const res = await axios.get<{
        code: number;
        status: string;
        data: ApiUser[];
      }>(`${BASE_URL}/api/v1/search`, {
        params: { keyword: q },
        withCredentials: true,
      });

      const data: FollowUserType[] = res.data.data.map((u) => ({
        id: u.id,
        full_name: u.full_name,
        username: u.username,
        profile_picture: u.profile_picture ?? null,
        isFollowing: u.isFollowing,
      }));

      setResults(data);
    } catch (err) {
      console.error("Failed to search users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFollow = async (
    userId: string,
    currentlyFollowing: boolean,
  ) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/follows`,
        { targetId: userId },
        { withCredentials: true },
      );

      setResults((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !currentlyFollowing } : u,
        ),
      );
    } catch (err) {
      console.error("Failed to toggle follow:", err);
    }
  };

  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>

      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-12 md:col-span-10 lg:col-span-6 space-y-4 pt-4">
        {/* Search Bar */}
        <div className="bg-[#262626] rounded-3xl p-3 shadow flex items-center gap-3">
          <SearchIcon size={24} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search your friend"
            className="w-full bg-transparent border-none outline-none ring-0 focus-visible:ring-0 focus:border-none text-white placeholder-gray-400"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="mt-4 space-y-3">
          {/* EMPTY STATE */}
          {!keyword && (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-20 space-y-3">
              <SearchIcon size={64} className="text-gray-600" />

              <h2 className="text-lg font-semibold text-gray-300">
                Search for friends
              </h2>

              <p className="text-sm max-w-sm">
                Type a username or name to find people you want to follow.
              </p>
            </div>
          )}

          {/* LOADING */}
          {keyword && loading && <p className="text-gray-400">Loading...</p>}

          {/* NO RESULT */}
          {keyword && !loading && results.length === 0 && (
            <p className="text-gray-400 text-center mt-6">No users found.</p>
          )}

          {/* SEARCH RESULTS */}
          {keyword &&
            results.map((user) => (
              <FollowCard
                key={user.id}
                {...user}
                onToggleFollow={handleToggleFollow}
              />
            ))}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Search;
