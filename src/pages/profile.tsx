import { useEffect, useState } from "react";
import { UserCircle, Pencil } from "lucide-react";
import Sidebar from "@/components/sidebar";
import SidebarCompact from "@/components/sidebarCompact";
import SidebarRight from "@/components/sidebarRight";
import { Button } from "@/components/ui/button";
import EditProfileDetailsDialog from "@/components/editProfileDetailDialog";
import EditProfilePhotoDialog from "@/components/editProfilePhotoDialog";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ThreadCard from "@/components/thread/threadCard";
import type { ThreadType } from "@/types/thread";
import FollowStats from "@/components/followStats";

const BASE_URL = "http://localhost:3000";

export interface ProfileType {
  id: string;
  email: string;
  username: string;
  full_name: string;
  bio: string | null;
  profile_picture: string | null;
  backgroundPhoto: string | null;
  created_at: string;
  followers_count?: number;
  following_count?: number;
}

function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
          withCredentials: true,
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/thread/threads/me`, {
          withCredentials: true,
        });
        setThreads(res.data.data);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
      }
    };
    fetchThreads();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  const backgroundUrl = profile.backgroundPhoto
    ? `${BASE_URL}${profile.backgroundPhoto}`
    : "https://picsum.photos/1200/400";

  const avatarUrl = profile.profile_picture
    ? `${BASE_URL}${profile.profile_picture}`
    : null;

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
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2 bg-black/60 text-white hover:bg-black/80 cursor-pointer"
            onClick={() => setOpenPhotoDialog(true)}
          >
            Edit Photos
          </Button>

          <div className="absolute -bottom-12 left-6">
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

          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-12 right-4 bg-black/60 text-white hover:bg-black/80 rounded-full cursor-pointer"
            onClick={() => setOpenDetailsDialog(true)}
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-16 px-6">
          <h1 className="text-2xl font-bold">
            {reduxUser?.full_name ?? profile.full_name}
          </h1>
          <p className="text-muted-foreground">
            @{reduxUser?.username ?? profile.username}
          </p>

          {reduxUser?.bio || profile.bio ? (
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
              {reduxUser?.bio ?? profile.bio}
            </p>
          ) : null}
        </div>

        <FollowStats userId={profile.id} className="mt-8" showPosts />

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

      <EditProfileDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        defaultValues={{
          full_name: profile.full_name,
          username: profile.username,
          email: profile.email,
          bio: profile.bio,
        }}
      />

      <EditProfilePhotoDialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        defaultValues={{
          profile_picture: profile.profile_picture,
          backgroundPhoto: profile.backgroundPhoto,
        }}
      />
    </div>
  );
}

export default Profile;
