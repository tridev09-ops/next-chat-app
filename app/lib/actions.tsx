'use server';

import connectDB from "@/app/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // ✅ Basic validation
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // ✅ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // ✅ Create JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // ✅ Set cookie
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  redirect("/users");
}