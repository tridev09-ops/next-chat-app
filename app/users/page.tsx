import Link from "next/link";
import User from "../ui/user";

export default function UsersPage() {
  return (
    <div className="flex flex-1 flex-col bg-gray-100 h-screen items-center justify-center">
      <Link href="/" className="float-right self-end p-4 bg-gray-800 text-white rounded-md m-2">Close</Link>

      <div className="w-full h-screen bg-gray-100 p-4 flex flex-col gap-6 overflow-y-auto">
        <User name="User1" />
        <User name="User2" />
        <User name="User3" />
        <User name="User4" />
        <User name="User5" />
        <User name="User6" />
        <User name="User7" />
        <User name="User8" />
        <User name="User9" />
      </div>
    </div>
  );
}