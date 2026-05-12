"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createConversation } from "@/routes/conversationFunction";

export default function User({
    name,
    email,
    conversationId,
    userId,
    currentUserId,
    receiverName
}: {
    name: string;
    email: string;
    conversationId?: string;
    userId?: string;
    currentUserId?: string;
    receiverName?: string;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const handleClick = () => {
        startTransition(async () => {
            let id = conversationId;

            if (!id && userId) {
                const newId = await createConversation(userId);
                if (newId) {
                    id = newId;
                } else {
                    setError("Failed to start conversation");
                    return;
                }
            }

            if (id) {
                const newUrl = `/conversation?conversationId=${id}&senderId=${currentUserId}&receiverName=${receiverName}`;
                router.push(newUrl);
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="
        bg-white dark:bg-slate-800 
        text-gray-900 dark:text-gray-100 
        p-4 
        rounded-sm 
        w-full 
        border 
        border-gray-200 
        dark:border-slate-700
        text-left
        cursor-pointer
        transition-colors
        hover:bg-gray-50
        dark:hover:bg-slate-700
        disabled:opacity-50
      "
        >
            {name}
            <div className="text-sm text-gray-600 dark:text-gray-300">{email}</div>
        </button>
    );
}   