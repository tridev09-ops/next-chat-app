import Link from "next/link";

export default function User({ name, email }: { name: string, email: string }) {
    return (
        <Link href="/conversation" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 p-4 rounded-sm w-full border border-gray-200 dark:border-slate-700">{name} <span className="text-sm text-gray-600 dark:text-gray-300">{email}</span></Link>
    );
}   