import { Logo } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, type UserResponse } from "@/store/authSlice";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  type LoginApi = {
    data: {
      token: string;
      user_id: string;
      email: string;
      username: string;
      name?: string; // bisa ada
      full_name?: string; // bisa ada
      avatar?: string | null; // server pakai 'avatar'
      backgroundPhoto?: string | null;
      created_at?: string; // bisa tidak ada
    };
    message?: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<LoginApi>(
        `${API_BASE}/api/v1/auth/login`,
        form,
        { withCredentials: true }
      );

      const d = res.data.data;
      const token = d.token;

      // BENTUK UserResponse sesuai tipe di authSlice.ts
      const userResp: UserResponse = {
        id: d.user_id,
        email: d.email,
        username: d.username,
        name: (d.name ?? d.full_name ?? "").trim(), // <-- WAJIB ada 'name'
        bio: null, // isi jika API mengirim
        profile_picture: d.avatar ?? null, // <-- map avatar -> profile_picture
        backgroundPhoto: d.backgroundPhoto ?? null,
        created_at: d.created_at ?? new Date().toISOString(), // <-- WAJIB ada 'created_at'
        threads: [], // isi jika API mengirim
      };

      dispatch(setCredentials({ token, user: userResp }));
      navigate("/thread");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Login gagal!");
      } else if (err instanceof Error) {
        console.error(err.message);
        alert("Terjadi kesalahan: " + err.message);
      } else {
        console.error("Unknown error", err);
        alert("Login gagal karena error tidak diketahui");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[108px] h-auto object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold text-white">Login to Circle</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="text"
            name="identifier"
            placeholder="Email/Username"
            className="text-white"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="text-white"
            required
            onChange={handleChange}
          />
          <div className="text-right">
            <Link
              to="/forgetPassword"
              className="text-sm text-white hover:underline"
            >
              Forgot password
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full py-6 font-semibold text-2xl hover:bg-green-500 text-white rounded-4xl cursor-pointer"
          >
            Login
          </Button>
        </form>
        <p className="text-left text-sm text-white">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-green-600 hover:underline hover:text-green-500 font-bold"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
