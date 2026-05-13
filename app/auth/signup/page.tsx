'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/actions";
import emojis from "@/data/emoji.json";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0]);
  const [form, setForm] = useState({
    name: "",
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

  const handleSubmit= async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const res = await signup({ ...form, emoji: selectedEmoji });
        setLoading(false);
        if (res.success) {
          setSuccess(res.message || "Account created successfully!");
          router.push("/");
        } else {
          setError(res.error || "Something went wrong");
        }
      }

  return (
    <div className="h-screen flex flex-col flex-1 items-center justify-center bg-surface-subtle text-text-primary font-sans">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-surface p-8 w-full max-w-112.5 rounded-2xl font-sans mx-4 border border-border">
        <h1 className="font-bold text-3xl mb-4">Sign up</h1>

        {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/30 p-2 rounded border border-red-200">{error}</p>}
        {success && <p className="text-green-500 text-sm bg-green-50 dark:bg-green-900/30 p-2 rounded border border-green-200">{success}</p>}
        {/* Username */}
        <div className="flex flex-col">
          <label className="text-text-primary font-semibold text-sm">Name</label>
        </div>

        <div className="flex items-center border-2 border-border rounded-lg h-12.5 pl-2 focus-within:border-accent transition bg-surface">
          <svg className="text-text-secondary shrink-0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            type="text"
            placeholder="Enter your Name"
            name="name"
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-text-primary bg-transparent"
            required
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-text-primary font-semibold text-sm">Email</label>
        </div>

        <div className="flex items-center border-2 border-border rounded-lg h-12.5 pl-2 focus-within:border-accent transition bg-surface">
          <svg className="text-text-secondary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
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
          <svg className="text-text-secondary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            name="password"
            className="ml-2 w-full h-full outline-none border-none rounded-lg text-text-primary bg-transparent"
            required
            onChange={handleChange}
          />

          <button type="button" onClick={togglePasswordVisibility} className="mr-4">
            {showPassword ? (
              <svg className="text-text-secondary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg className="text-text-secondary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            )}
          </button>
        </div>

        {/* Emoji picker */}
        <div className="flex flex-col mt-4">
          <label className="text-text-primary font-semibold text-sm mb-2">Pick your avatar</label>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji: string) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-xl w-9 h-9 flex items-center justify-center rounded-lg border-2 transition ${
                  selectedEmoji === emoji
                    ? "border-accent bg-accent-subtle"
                    : "border-transparent hover:border-border"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="mt-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-accent" />
            <label>Remember me</label>
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="mt-5 mb-2 bg-accent text-white text-sm font-medium rounded-lg h-12.5 w-full hover:bg-accent-hover transition disabled:opacity-50">
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent font-medium cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}