import { NavLink, useNavigate } from "react-router-dom";
import { Home, UserRoundSearch, User, Heart, LogOut } from "lucide-react";
import { Circle } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Logout gagal dari server");
      }
    } catch (err) {
      console.error("Error logout:", err);
    } finally {
      console.log(">>> SEBELUM DISPATCH");
      dispatch(logout());
      console.log(">>> SESUDAH DISPATCH");
      navigate("/");
    }
  };

  const navItems = [
    { label: "Home", href: "/thread", icon: <Home size={30} /> },
    { label: "Search", href: "/search", icon: <UserRoundSearch size={30} /> },
    { label: "Follows", href: "/follows", icon: <Heart size={30} /> },
    { label: "Profile", href: "/profile", icon: <User size={30} /> },
  ];

  return (
    <aside className="col-span-3 pt-8 flex flex-col justify-between h-screen p-8 sticky top-0 border-r border-gray-700">
      <div className="space-y-8">
        <div>
          <img
            src={Circle}
            alt="Logo"
            className="w-2/4 h-auto object-contain"
          />
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex text-[18px] items-center gap-5 mt-3 px-4 py-4 rounded-2xl font-medium transition-colors ${
                  isActive
                    ? "font-bold text-green-400 bg-gray-800/30"
                    : "text-gray-300 hover:text-green-400 hover:bg-gray-800/30"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Button className="w-full cursor-pointer text-2xl py-6 rounded-3xl bg-[#04A51E] font-semibold text-white hover:bg-green-600">
          Create Post
        </Button>
      </div>

      <div>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="flex w-full text-[18px] items-center gap-5 px-4 py-4 rounded-2xl font-medium transition-colors text-gray-300 hover:text-red-500 hover:bg-gray-800/30 cursor-pointer"
        >
          <LogOut size={30} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
