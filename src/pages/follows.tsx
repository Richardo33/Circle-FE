import { useState } from "react";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebarRight";
import SidebarCompact from "@/components/sidebarCompact";

function Follows() {
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    "followers"
  );

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
            onClick={() => setActiveTab("followings")}
            className={`mx-5 py-2 w-1/2 flex justify-center items-center border-b-4 cursor-pointer ${
              activeTab === "followings"
                ? "border-[#04A51E] text-green-500"
                : "border-transparent text-gray-400 hover:border-[#04A51E] hover:text-green-500"
            }`}
          >
            <h3>Followings</h3>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {activeTab === "followers" && <div></div>}

          {activeTab === "followings" && <div></div>}
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Follows;
