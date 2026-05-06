import Link from "next/link";
import User from "../ui/user";
import { logout } from "../lib/actions";
import getUsers from "../lib/getUsers";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="flex flex-1 flex-col bg-gray-100 h-screen items-center justify-center">
      <form action={logout}>
        <button className="float-right self-end p-4 bg-gray-800 text-white rounded-md m-2">Logout</button>
      </form>

      <div className="w-full h-screen bg-gray-100 p-4 flex flex-col gap-6 overflow-y-auto">
        {users.map((user: any) => {
          return <User key={user._id} name={user.name} email={user.email} />;
        })}
      </div>
    </div>
  );
}