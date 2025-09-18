import type { RootState } from "@/store/store";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:3000/profile";

function SidebarRight() {
  const user = useSelector((state: RootState) => state.auth.user);

  const avatarUrl = user?.avatar ? `${BASE_URL}${user.avatar}` : null;

  return (
    <aside className="col-span-3 space-y-4 h-screen sticky top-0 pt-4 border-l p-8 border-gray-700">
      <div className="bg-[#262626] rounded-2xl p-4 shadow">
        <div className="flex items-center space-x-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.username}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-12 h-12 text-gray-400" />
          )}
          <div>
            <p className="font-semibold">{user?.full_name ?? "Guest"}</p>
            <p className="text-sm text-gray-400">
              @{user?.username ?? "anonymous"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#262626] rounded-2xl p-4 shadow space-y-2">
        <h2 className="font-semibold">Who to follow</h2>
      </div>

      <div className="bg-[#262626] rounded-2xl p-4 shadow text-center text-sm text-gray-400">
        Developed by <span className="text-green-500">Richard Ganteng</span>
      </div>
    </aside>
  );
}

export default SidebarRight;
