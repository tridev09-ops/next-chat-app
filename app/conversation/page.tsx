import Form from "@/ui/form";
import Messages from "@/ui/messages";
import Link from "next/link";
import { getCurrentUserId } from "@/lib/auth";
import SocketManager from "@/ui/SocketManager";
import { getUserById } from "@/routes/userFuncton";

export default async function ConversationPage({
  searchParams,
}: {
  searchParams: Promise<{ conversationId?: string, receiverName?: string }>;
}) {
  const { conversationId, receiverName } = await searchParams;

  const currentUserId = await getCurrentUserId();
  if (!currentUserId) return null;

  const currentUser = await getUserById(currentUserId);
  const socketDisplayName = currentUser?.name ?? currentUserId;

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900">
        <SocketManager name={socketDisplayName} />
        <div className="flex flex-1 flex-col min-h-0 bg-slate-100 dark:bg-slate-900">
        <div className="flex-shrink-0 flex items-center w-full h-14 bg-white dark:bg-slate-800 border-b-2 border-gray-200 dark:border-slate-700">
          <Link href="/" className="cursor-pointer px-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold ml-[28%] sm:ml-12 md:ml-[35%] lg:ml-[45%] text-center text-gray-900 dark:text-gray-100">{receiverName || "Conversation"}</h1>
        </div>
        <Messages conversationId={conversationId} currentUserId={currentUserId} />
        <div className="flex-shrink-0">
          <Form key={conversationId} conversationId={conversationId} sender={currentUserId} receiverName={receiverName}/>
        </div>
      </div>
    </div>
  );
}