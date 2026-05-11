'use server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        return decoded.userId;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}
