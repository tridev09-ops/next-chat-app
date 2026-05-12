import User from "@/ui/user";
import { logout } from "@/lib/actions";
import {fetchUsers, getUserById } from "@/routes/userFuncton";
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

  const conversations = conversationsData || [];
  const users = usersData || [];

  const user = await getUserById(userId as string);
  const name = user?.name || "Anonymous";

  return (
    <div className="flex flex-1 flex-col bg-surface-subtle h-screen items-center justify-center text-text-primary">
      <form action={logout}>
        <button className="float-right self-end p-4 bg-accent text-white rounded-md m-2 hover:bg-accent-hover transition-colors">Logout</button>
      </form>

      <div className="w-full h-screen bg-surface-subtle p-4 flex flex-col gap-6 overflow-y-auto">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <div className="flex flex-col gap-2">
          {conversations.map((conv: any) => {
            return conv.participants
              .filter((part: any) => part._id.toString() !== userId)
              .map((part: any) => {
                return <User key={part._id} name={part.name} email={part.email} emoji={part.emoji} conversationId={conv._id.toString()} currentUserId={userId as string} receiverName={part.name} />;
              });
          })}
        </div>

        <h2 className="text-lg font-semibold">Users</h2>
        <div className="flex flex-col gap-2">
          {users.filter((u: any) => u._id.toString() !== userId).map((user: any) => {
            // Find conversation with this user
            const existingConv = conversations.find((conv: any) =>
              conv.participants.some((p: any) => p._id.toString() === user._id.toString())
            );

            return (
              <User
                key={user._id}
                name={user.name}
                email={user.email}
                emoji={user.emoji}
                conversationId={existingConv ? existingConv._id.toString() : ""}
                userId={user._id.toString()}
                currentUserId={userId as string}
                receiverName={user.name}
              />
            );
          })}
        </div>
      </div>
      <SocketManager name={name} />
    </div>
  );
}