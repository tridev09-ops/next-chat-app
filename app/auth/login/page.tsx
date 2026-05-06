'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/app/lib/actions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-screen flex flex-col flex-1 items-center justify-center bg-blue-50 font-sans">
      <form onSubmit={(e) => {
        e.preventDefault();
        login(form as any);
      }} className="flex flex-col gap-3 bg-white p-8 w-full max-w-112.5 rounded-2xl font-sans mx-4">
        <h1 className="font-bold text-3xl mb-4">Login</h1>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-[#151717] font-semibold text-sm">Email</label>
        </div>

        <div className="flex items-center border-2 border-[#ecedec] rounded-lg h-12.5 pl-2 focus-within:border-blue-500 transition">
          <Image
            src="/icons/email.png"
            alt="Email Icon"
            width={20}
            height={20} />
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-[#151717]"
            required
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-[#151717] font-semibold text-sm">Password</label>
        </div>

        <div className="flex items-center border-2 border-[#ecedec] rounded-lg h-12.5 pl-2 focus-within:border-blue-500 transition">
          <Image
            src="/icons/password.png"
            alt="password Icon"
            width={20}
            height={20} />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            name="password"
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-[#151717]"
            required
            onChange={handleChange}
          />

          <button type="button" onClick={togglePasswordVisibility}>
            <Image
              src={showPassword ? "/icons/eye-open.png" : "/icons/eye-close.png"}
              alt="Eye Icon"
              width={20}
              height={20}
              className="mr-4"
            />
          </button>
        </div>

        {/* Remember + Forgot */}
        <div className="mt-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-blue-500" />
            <label>Remember me</label>
          </div>
          <span className="text-blue-500 font-medium cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Submit */}
        <button className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-lg h-12.5 w-full hover:bg-[#252727] transition">
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 font-medium cursor-pointer">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}