import getConversations from "../lib/getConversation";
import Form from "../ui/form";
import Messages from "../ui/messages";
import Link from "next/link";
import { getCurrentUser } from "../lib/auth";

export default async function ConversationPage() {
    return (
    <div className="flex flex-1 flex-col h-full bg-secondary">
      <div className="flex flex-1 flex-col bg-slate-100">
        <div className="flex items-center w-full h-14 bg-white border-b-2">
          <Link href="/users" className="cursor-pointer px-4 text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold ml-[28%] sm:ml-12 md:ml-[35%] lg:ml-[45%] text-center">Conversation</h1>
        </div>
        <Messages />
        <Form />
      </div>
    </div>
  );
}