import { fetchMessages } from "@/routes/messageFunction";
import MessagesClient, {
  type SerializableMessage,
} from "@/ui/MessagesClient";

export default async function Messages({
  conversationId,
  currentUserId,
}: {
  conversationId?: string;
  currentUserId?: string;
}) {
  const raw =
    conversationId && conversationId.length > 0
      ? await fetchMessages(conversationId)
      : [];

  const initialMessages = JSON.parse(
    JSON.stringify(raw ?? [])
  ) as SerializableMessage[];

  return (
    <MessagesClient
      key={conversationId ?? "none"}
      initialMessages={initialMessages}
      conversationId={conversationId}
      currentUserId={currentUserId}
    />
  );
}
