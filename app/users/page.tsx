import User from "../ui/user";
import { logout } from "../lib/actions";
import getUsers from "../lib/getUsers";
import getConversations from "../lib/getConversation";
import { getCurrentUser } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const userId = await getCurrentUser();
  
  if (!userId) {
    redirect("/auth/login");
  }

  const conversationsData = await getConversations(userId as string);
  const usersData = await getUsers();

  const conversations = conversationsData || [];
  const users = usersData || [];

  return (
    <div className="flex flex-1 flex-col bg-gray-100 h-screen items-center justify-center">
      <form action={logout}>
        <button className="float-right self-end p-4 bg-gray-800 text-white rounded-md m-2">Logout</button>
      </form>

      <div className="w-full h-screen bg-gray-100 p-4 flex flex-col gap-6 overflow-y-auto">
        <h2>Conversations</h2>
        <div className="flex flex-col gap-2">
          {conversations.map((conv: any) => {
            return <User key={conv._id} name={conv.name || "Conversation"} email={conv.email || ""} />;
          })}
        </div>
        
        <h2>Users</h2>
        <div className="flex flex-col gap-2">
          {users.map((user: any) => {
            return <User key={user._id} name={user.name} email={user.email} />;
          })}
        </div>
      </div>
    </div>
  );
}