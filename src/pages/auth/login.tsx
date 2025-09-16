import { Logo } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

function Login() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        form,
        { withCredentials: true }
      );

      console.log("Login sukses:", res.data);

      const data = res.data.data;
      const token = data.token;
      const user = {
        id: data.user_id,
        email: data.email,
        full_name: data.name,
        username: data.username,
        avatar: data.avatar,
      };

      dispatch(setCredentials({ token, user }));

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
