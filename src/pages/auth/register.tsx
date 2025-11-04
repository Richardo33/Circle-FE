import { Logo } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, type UserResponse } from "@/store/authSlice";
import { Camera } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  type RegisterApi = {
    data: {
      token: string;
      user_id: string;
      email: string;
      username?: string;
      name?: string;
      full_name?: string;
      photo_profile?: string | null; // bisa juga "avatar" tergantung API
      avatar?: string | null;
      backgroundPhoto?: string | null;
      created_at?: string;
    };
    message?: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", form.full_name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (file) formData.append("profileImage", file);

      const res = await axios.post<RegisterApi>(
        `${API_BASE}/api/v1/auth/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const d = res.data.data;
      const token = d.token;

      // Map ke tipe YANG DIHARAPKAN reducer (UserResponse)
      const userResp: UserResponse = {
        id: d.user_id,
        email: d.email,
        username: d.username ?? d.email.split("@")[0],
        name: (d.name ?? d.full_name ?? "").trim(), // WAJIB ada 'name'
        bio: null,
        profile_picture: d.photo_profile ?? d.avatar ?? null, // map ke 'profile_picture'
        backgroundPhoto: d.backgroundPhoto ?? null,
        created_at: d.created_at ?? new Date().toISOString(), // WAJIB ada 'created_at'
        threads: [],
      };

      dispatch(setCredentials({ token, user: userResp }));
      navigate("/thread");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Registrasi gagal!");
      } else if (err instanceof Error) {
        console.error(err.message);
        alert("Terjadi kesalahan: " + err.message);
      } else {
        console.error("Unknown error", err);
        alert("Registrasi gagal karena error tidak diketahui");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-8 bg-blend-darken">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[108px] h-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-semibold text-white">
          Create account Circle
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
          encType="multipart/form-data"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=Circle&background=1a1a1a&color=fff"
                }
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-500"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
            </div>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-400">Upload your profile picture</p>
          </div>

          <Input
            type="text"
            name="full_name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            autoComplete="off"
            className="px-4 py-5 border text-white border-gray-500 rounded-md"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="off"
            onChange={handleChange}
            className="px-4 py-5 border text-white border-gray-500 rounded-md"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="px-4 py-5 border text-white border-gray-500 rounded-md"
          />

          <Button
            type="submit"
            className="w-full py-6 px-4 hover:bg-green-600 font-semibold text-2xl text-white rounded-4xl cursor-pointer"
          >
            Create
          </Button>
        </form>

        <p className="text-left text-sm text-white">
          Already have account?{" "}
          <Link to="/" className="text-green-600 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
