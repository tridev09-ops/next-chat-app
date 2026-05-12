'use client'
import { useState } from "react";
import socket from "@/lib/socketClient";

export default function Form({ conversationId, sender,receiverName }: { conversationId?: string, sender?: string ,receiverName?:string}) {
    const [form, setForm] = useState({
        conversationId: conversationId || "",
        message: "",
        sender: sender || "",
        receiverName: receiverName || "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            message: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = form.message.trim();
        if (!message) return;

        const messageObj = {
            ...form,
            message,
            clientMessageId: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            createdAt: new Date().toISOString(),
        };

        // Optimistic UI: render immediately before socket/db work.
        window.dispatchEvent(
            new CustomEvent("local:chat-message", {
                detail: messageObj,
            })
        );
        socket.emit('chat message', messageObj);
        setForm({
            ...form,
            message: ""
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex py-4 justify-center w-full bg-gray-200 dark:bg-slate-800 border-t-2 border-gray-300 dark:border-slate-700">
            <input type="text" name="message"   onChange={handleChange} value={form.message} className="flex-1 border-none outline-none py-3 px-4 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-full max-w-[500px]"
                placeholder="Enter you message..."
            />
            <button type="submit" className="bg-[#151717] dark:bg-slate-600 text-white px-4 mx-4 rounded-xl">Send</button>
        </form>
    );
}