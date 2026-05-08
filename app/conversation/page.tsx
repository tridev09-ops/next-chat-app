import getConversations from "../lib/getConversation";
import Form from "../ui/form";
import Messages from "../ui/messages";
import Link from "next/link";
import { getCurrentUser } from "../lib/auth";

export default async function ConversationPage({
  searchParams,
}: {
  searchParams: Promise<{ conversationId?: string }>;
}) {
  const { conversationId } = await searchParams;

  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  return (
    <div className="flex flex-1 flex-col h-full bg-slate-100 dark:bg-slate-900">
      <div className="flex flex-1 flex-col bg-slate-100 dark:bg-slate-900">
        <div className="flex items-center w-full h-14 bg-white dark:bg-slate-800 border-b-2 border-gray-200 dark:border-slate-700">
          <Link href="/users" className="cursor-pointer px-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold ml-[28%] sm:ml-12 md:ml-[35%] lg:ml-[45%] text-center text-gray-900 dark:text-gray-100">Conversation</h1>
        </div>
        <Messages conversationId={conversationId} currentUserId={currentUser} />
        <Form key={conversationId} conversationId={conversationId} sender={currentUser} />
      </div>
    </div>
  );
}