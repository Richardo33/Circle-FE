// import React from "react";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebarRight";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import SidebarCompact from "@/components/sidebarCompact";

function Search() {
  return (
    <div className="min-h-full text-white grid grid-cols-12 gap-4 px-4 sm:px-6">
      <div className="hidden lg:block col-span-3">
        <Sidebar />
      </div>

      <div className="hidden md:block lg:hidden col-span-2">
        <SidebarCompact />
      </div>

      <main className="col-span-6 space-y-4 pt-4">
        <div className="bg-[#262626] rounded-3xl p-3 shadow flex items-center gap-3">
          <SearchIcon size={24} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search your friend"
            className="w-full bg-transparent border-none outline-none ring-0 focus-visible:ring-0 focus:border-none text-white placeholder-gray-400"
          />
        </div>
      </main>

      <div className="hidden lg:block col-span-3">
        <SidebarRight />
      </div>
    </div>
  );
}

export default Search;
