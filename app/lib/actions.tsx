'use server';

import connectDB from "./db/db";
import User from "./db/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Conversation from "./db/models/conversationModel";
import Message from "./db/models/messageModel";
import { getCurrentUser } from "./auth";

export type ActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function signup(form: any): Promise<ActionResponse> {
  const name = form.name as string;
  const email = form.email as string;
  const password = form.password as string;

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Create JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return { success: true, message: "Signup successful" };
}

export async function login(form: any): Promise<ActionResponse> {
  const email = form.email as string;
  const password = form.password as string;

  if (!email || !password) {
    return { success: false, error: "All fields are required" };
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, error: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, error: "Invalid password" };
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return { success: true, message: "Login successful" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  redirect("/auth/login");
}

export async function createConversation(receiverId: string): Promise<string | null> {
  const senderId = await getCurrentUser();
  if (!senderId) return null;

  await connectDB();

  try {
    // Check if conversation already exists
    const existing = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (existing) {
      return existing._id.toString();
    }

    const newConversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [],
    });

    revalidatePath("/users");
    return newConversation._id.toString();
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
}

export async function sendMessage(form: any): Promise<ActionResponse> {
  const conversationId = form.conversationId as string;
  const messageText = form.message as string;
  const senderId = form.sender as string;

  if (!conversationId || !messageText || !senderId) {
    return { success: false, error: "All fields are required" };
  }

  await connectDB();

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return { success: false, error: "Conversation not found" };
    }

    const receiverId = conversation.participants.find((p: string) => p !== senderId);

    if (!receiverId) {
      return { success: false, error: "Receiver not found" };
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message: messageText,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: newMessage._id }
    });

    revalidatePath("/conversation");

    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}