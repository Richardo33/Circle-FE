import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircle } from "lucide-react";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ThreadCard from "@/components/thread/threadCard";
import FollowStats from "@/components/followStats";
import type { ThreadType } from "@/types/thread";
import type { ProfileType } from "@/pages/profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const BASE_URL = "http://localhost:3000";

function ProfileByUsername() {
  const { username } = useParams<{ username: string }>();
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/search/${username}`, {
          withCredentials: true,
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/thread/threads/${username}`,
          { withCredentials: true }
        );
        setThreads(res.data.data);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
      }
    };
    fetchThreads();
  }, [username]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  const backgroundUrl = profile.backgroundPhoto
    ? `${BASE_URL}${profile.backgroundPhoto}`
    : "https://picsum.photos/1200/400";

  const avatarUrl = profile.photo_profile
    ? `${BASE_URL}${profile.photo_profile}`
    : null;

  const isMyProfile = reduxUser?.id === profile.id;

  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>
      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-6 space-y-6 pt-4">
        <div className="relative">
          <img
            src={backgroundUrl}
            alt="Background"
            className="w-full h-60 object-cover rounded-xl"
          />

          <div className="absolute -bottom-12 left-6 z-10">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile.username}
                className="w-28 h-28 rounded-full border-4 border-background object-cover shadow-lg"
              />
            ) : (
              <UserCircle className="w-28 h-28 text-gray-400 bg-gray-800 rounded-full border-4 border-background" />
            )}
          </div>

          <div className="absolute -bottom-12 right-4">
            {isMyProfile && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/60 text-white hover:bg-black/80 cursor-pointer"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="mt-16 px-6">
          <h1 className="text-2xl font-bold">{profile.full_name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>

          {profile.bio && (
            <p
              className="mt-3 text-sm text-muted-foreground"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {profile.bio}
            </p>
          )}
        </div>

        <FollowStats
          userId={profile.id}
          className="mt-8"
          showPosts
          isMyProfile={isMyProfile}
        />

        <div className="mt-8 space-y-4">
          {threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))
          ) : (
            <p className="text-gray-400 text-center py-6">
              No threads created yet.
            </p>
          )}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default ProfileByUsername;
