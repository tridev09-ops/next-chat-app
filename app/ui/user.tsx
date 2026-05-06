import Link from "next/link";

export default function User({ name, email }: { name: string, email: string }) {
    return (
        <Link href="/conversation" className="bg-white p-4 rounded-sm w-full">{name} <span className="text-sm">{email}</span></Link>
    );
}   