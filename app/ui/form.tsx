'use client'
import { useState } from "react";
import { sendMessage } from "../lib/actions";

export default function Form({ conversationId, sender }: { conversationId?: string, sender?: string }) {
    const [form, setForm] = useState({
        conversationId: conversationId || "",
        message: "",
        sender: sender || "",
    });
    const handleChange = (e: any) => {
        setForm({
            ...form,
            message: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.message.trim()) return;
        
        await sendMessage(form);
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