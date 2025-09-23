import { NavLink, useNavigate } from "react-router-dom";
import { Home, UserRoundSearch, User, Heart, LogOut } from "lucide-react";
import { Circle } from "@/assets/image";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

export default function SidebarCompact() {
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
      console.log(">>> SidebarCompact logout jalan");
      dispatch(logout());
      navigate("/");
    }
  };

  const navItems = [
    { label: "Home", href: "/thread", icon: <Home size={28} /> },
    { label: "Search", href: "/search", icon: <UserRoundSearch size={28} /> },
    { label: "Follows", href: "/follows", icon: <Heart size={28} /> },
    { label: "Profile", href: "/profile", icon: <User size={28} /> },
  ];

  return (
    <aside className="h-screen flex flex-col justify-between items-center py-8 sticky top-0 border-r border-gray-700">
      <div className="space-y-8 flex flex-col items-center">
        <img src={Circle} alt="Logo" className="w-10 h-auto object-contain" />

        <nav className="space-y-6 flex flex-col items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-gray-800/30 text-green-400"
                    : "text-gray-300 hover:text-green-400 hover:bg-gray-800/30"
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="p-3 rounded-xl text-gray-300 hover:text-red-500 hover:bg-gray-800/30"
      >
        <LogOut size={28} />
      </button>
    </aside>
  );
}
