import Link from "next/link";

export default function User({ name }: { name: string }) {
    return (
        <Link href="/conversation" className="bg-white p-4 rounded-sm w-full">{name}</Link>
    );
}   