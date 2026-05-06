'use server';

import connectDB from "./db/db";
import User from "./db/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(form: any) {
  const name = form.name as string;
  const email = form.email as string;
  const password = form.password as string;

  // ✅ Basic validation
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  connectDB();

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
  (await
    // ✅ Set cookie
    cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  redirect("/users");
}

export async function login(form: any) {
  const email = form.email as string;
  const password = form.password as string;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  redirect("/users");
}

export async function logout() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
  });
  redirect("/auth/login");
}