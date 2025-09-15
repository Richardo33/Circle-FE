import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebarRight";
import SidebarCompact from "@/components/sidebarCompact";

function Profile() {
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
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Profile;
