import { Gintoki } from "@/assets/image";

function SidebarRight() {
  return (
    <aside className="col-span-3 space-y-4 h-screen sticky top-0 pt-4 border-l p-8 border-gray-700">
      <div className="bg-[#262626] rounded-2xl p-4 shadow">
        <div className="flex items-center space-x-3">
          <img
            src={Gintoki}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">Alvin Rikardo</p>
            <p className="text-sm text-gray-400">@Richard</p>
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
