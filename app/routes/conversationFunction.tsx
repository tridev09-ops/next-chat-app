"use server";
import Conversation from "@/lib/db/models/conversationModel";
import connectDB from "@/lib/db/db";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

export async function fetchConversations(userId: string) {
    await connectDB();

    try {
        const conversations = await Conversation.find({
            participants: userId
        }).populate('participants');

        return conversations;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
}