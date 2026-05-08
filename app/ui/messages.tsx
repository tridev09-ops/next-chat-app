import { getConversationMessages } from "../lib/getConversation";
import Message from "./message";

export default async function Messages({
  conversationId,
  currentUserId,
}: {
  conversationId?: string;
  currentUserId?: string;
}) {
  const messages = conversationId
    ? await getConversationMessages(conversationId)
    : [];

  return (
    <div className="flex flex-1 flex-col h-20">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col h-20 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No messages found</p>
        </div>
      ) : (
      messages?.map((message: any) => (
        <Message 
          key={message._id} 
          message={message.message} 
          sender={message.sender === currentUserId ? 'me' : 'other'} 
          timeStamp={message.createdAt}
        />
      )))}
    </div>
  );
}