// import React from "react";
import { Logo } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        form,
        { withCredentials: true }
      );

      console.log("Respon:", res.data);
      navigate("/thread");
    } catch (err: unknown) {
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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="text"
            name="full_name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="px-4 py-5 border text-white border-gray-500 rounded-md"
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            required
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
            variant="default"
            className="w-full py-6 px-4  hover:bg-green-600 font-semibold text-2xl text-white rounded-4xl cursor-pointer"
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
