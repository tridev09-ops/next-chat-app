import UserList from "@/ui/UserList";
import { logout } from "@/lib/actions";
import { fetchUsers, getUserById } from "@/routes/userFunction";
import { fetchConversations } from "@/routes/conversationFunction";
import { getCurrentUserId } from "@/lib/auth";
import { redirect } from "next/navigation";
import SocketManager from "@/ui/SocketManager";

export default async function UsersPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/auth/login");
  }

  const conversationsData = await fetchConversations(userId as string);
  const usersData = await fetchUsers();

  const conversations = conversationsData
    ? JSON.parse(JSON.stringify(conversationsData))
    : [];
  const users = usersData ? JSON.parse(JSON.stringify(usersData)) : [];

  const user = await getUserById(userId as string);
  const name = user?.name || "Anonymous";

  return (
    <div className="flex flex-1 flex-col bg-surface-subtle h-screen text-text-primary">
      <UserList userId={userId as string} conversations={conversations} users={users} />
      <SocketManager name={name} userId={userId as string} />
    </div>
  );
}
