'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/actions";
import emojis from "@/../data/emoji.json";

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
          <Image
            src="/icons/user.png"
            alt="User Icon"
            width={24}
            height={24} />
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