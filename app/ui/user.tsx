"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createConversation } from "@/routes/conversationFunction";

import EmojiAvatar from "@/../components/EmojiAvatar";

export default function User({
    name,
    email,
    emoji,
    conversationId,
    userId,
    currentUserId,
    receiverName
}: {
    name: string;
    email: string;
    emoji?: string;
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
                const newUrl = `/conversation?conversationId=${id}&senderId=${currentUserId}&receiverName=${receiverName}&receiverEmoji=${encodeURIComponent(emoji || "")}`;
                router.push(newUrl);
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="bg-surface text-text-primary p-4 rounded-sm w-full border border-border text-left cursor-pointer transition-colors hover:bg-surface-hover disabled:opacity-50"
        >
            <div className="flex items-center gap-3">
              <EmojiAvatar emoji={emoji || "😀"} size="text-2xl" />
              <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-text-secondary">{email}</div>
              </div>
            </div>
        </button>
    );
}   