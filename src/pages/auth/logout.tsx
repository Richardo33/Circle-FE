import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch {
        /* empty */
      }
      dispatch(logout());
      navigate("/", { replace: true });
    })();
  }, [dispatch, navigate]);

  return null;
}
