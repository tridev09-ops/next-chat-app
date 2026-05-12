'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit=async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const res = await login(form as any);
        setLoading(false);
        if (res.success) {
          setSuccess(res.message || "Login successful!");
          router.push("/");
        } else {
          setError(res.error || "Something went wrong");
        }
      }

  return (
    <div className="h-screen flex flex-col flex-1 items-center justify-center bg-surface-subtle text-text-primary font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-surface p-8 w-full max-w-112.5 rounded-2xl font-sans mx-4 border border-border">
        <h1 className="font-bold text-3xl mb-4">Login</h1>

        {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">{error}</p>}
        {success && <p className="text-green-500 text-sm bg-green-50 p-2 rounded border border-green-200">{success}</p>}

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-text-primary font-semibold text-sm">Email</label>
        </div>

        <div className="flex items-center border-2 border-border rounded-lg h-12.5 pl-2 focus-within:border-accent transition bg-surface">
          <Image
            src="/icons/email.png"
            alt="Email Icon"
            width={20}
            height={20} />
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-text-primary bg-transparent"
            required
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-text-primary font-semibold text-sm">Password</label>
        </div>

        <div className="flex items-center border-2 border-border rounded-lg h-12.5 pl-2 focus-within:border-accent transition bg-surface">
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
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-text-primary bg-transparent"
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
            <input type="checkbox" className="h-4 w-4 accent-accent" />
            <label>Remember me</label>
          </div>
          <span className="text-accent font-medium cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="mt-5 mb-2 bg-accent text-white text-sm font-medium rounded-lg h-12.5 w-full hover:bg-accent-hover transition disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-accent font-medium cursor-pointer">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}