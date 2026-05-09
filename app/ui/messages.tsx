import { fetchMessages } from "@/routes/messageFunction";
import Message from "./message";
import { getDate } from "@/lib/extractTimestamp";
import React from "react";

export default async function Messages({
  conversationId,
  currentUserId,
}: {
  conversationId?: string;
  currentUserId?: string;
}) {
  const messages = conversationId
    ? await fetchMessages(conversationId)
    : [];

  let lastDate = "";

  return (
    <div className="flex flex-1 flex-col h-20">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col h-20 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No messages found</p>
        </div>
      ) : (
        messages.map((message: any) => {
          const currentDate = getDate(message.createdAt);
          const showHeader = currentDate !== lastDate;
          lastDate = currentDate;

          return (
            <React.Fragment key={message._id}>
              {showHeader && (
                <p className="text-center my-4 text-sm text-gray-500">
                  {currentDate}
                </p>
              )}
              <Message
                message={message.message}
                sender={message.sender === currentUserId ? "me" : "other"}
                timeStamp={message.createdAt}
              />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}