"use client";
import { useState, useEffect, useCallback } from "react";
import Search from "./search";
import User from "./user";
import { logout } from "@/lib/actions";
import { fetchUsers } from "@/routes/userFunction";
import { fetchConversations } from "@/routes/conversationFunction";

export default function UserList({
    userId,
    conversations: initialConversations,
    users: initialUsers,
}: {
    userId: string;
    conversations: any[];
    users: any[];
}) {
    const [query, setQuery] = useState("");
    const [conversations, setConversations] = useState(initialConversations);
    const [users, setUsers] = useState(initialUsers);
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

    const refresh = useCallback(async () => {
        const [freshUsers, freshConvs] = await Promise.all([
            fetchUsers().catch(() => null),
            fetchConversations(userId).catch(() => null),
        ]);
        if (freshUsers) setUsers(freshUsers);
        if (freshConvs) setConversations(freshConvs);
    }, [userId]);

    useEffect(() => {
        const handler = (e: Event) => {
            setOnlineUsers(new Set((e as CustomEvent<string[]>).detail));
        };
        window.addEventListener("online-users", handler);
        return () => window.removeEventListener("online-users", handler);
    }, []);

    useEffect(() => {
        const interval = setInterval(refresh, 10000);
        return () => clearInterval(interval);
    }, [refresh]);

    const q = query.toLowerCase();

    const conversationUserIds = new Set(
        conversations.flatMap((conv: any) =>
            conv.participants.map((p: any) => p._id.toString())
        )
    );

    const filteredConversations = conversations.filter((conv: any) =>
        conv.participants.some(
            (p: any) =>
                p._id.toString() !== userId &&
                p.name.toLowerCase().includes(q)
        )
    );

    const filteredUsers = q
        ? users.filter(
              (u: any) =>
                  u._id.toString() !== userId &&
                  !conversationUserIds.has(u._id.toString()) &&
                  u.name.toLowerCase().includes(q)
          )
        : [];

    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border shrink-0">
                <Search value={query} onChange={setQuery} />
                <form action={logout}>
                    <button className="p-2 text-text-secondary border border-border rounded-lg hover:bg-surface-hover hover:text-text-primary transition-colors" title="Logout">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className="flex-1 bg-surface-subtle p-4 flex flex-col gap-6 overflow-y-auto">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <div className="flex flex-col gap-2">
                    {filteredConversations.length === 0 ? (
                        <p className="text-text-secondary text-sm">No conversations found</p>
                    ) : (
                        filteredConversations.map((conv: any) =>
                            conv.participants
                                .filter((part: any) => part._id.toString() !== userId)
                                .map((part: any) => (
                                    <User
                                        key={part._id}
                                        name={part.name}
                                        email={part.email}
                                        emoji={part.emoji}
                                        conversationId={conv._id.toString()}
                                        currentUserId={userId}
                                        receiverName={part.name}
                                        isOnline={onlineUsers.has(part._id.toString())}
                                    />
                                ))
                        )
                    )}
                </div>

                {q && (
                    <>
                        <h2 className="text-lg font-semibold">Users</h2>
                        <div className="flex flex-col gap-2">
                            {filteredUsers.length === 0 ? (
                                <p className="text-text-secondary text-sm">No users match your search</p>
                            ) : (
                                filteredUsers.map((u: any) => (
                                    <User
                                        key={u._id}
                                        name={u.name}
                                        email={u.email}
                                        emoji={u.emoji}
                                        userId={u._id.toString()}
                                        currentUserId={userId}
                                        receiverName={u.name}
                                        isOnline={onlineUsers.has(u._id.toString())}
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
